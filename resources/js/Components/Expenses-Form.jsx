import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CalendarIcon, Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ordersService from "@/lib/Services/orders";

// Expense types
const expenseTypes = [
  { value: "manpower", label: "Manpower" },
  { value: "food", label: "Food" },
  { value: "fair", label: "Fair" },
  { value: "fuel", label: "Fuel" },
  { value: "staffAdvance", label: "Staff Advance" },
  { value: "miscellaneous", label: "Miscellaneous" },
];

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function ExpenseForm() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fetchedOrders, setFetchedOrders] = useState([]); // Renamed to avoid shadowing

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await ordersService.getUserOrders();
        const parsedOrders = response.orders.map((order) => ({
          ...order,
          products: typeof order.products === "string" ? JSON.parse(order.products) : order.products,
        }));
        setFetchedOrders(parsedOrders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Initialize form
  const form = useForm({
    defaultValues: {
      orderId: "",
      expenses: expenseTypes.map((type) => ({
        type: type.value,
        amount: undefined,
      })),
      otherExpenses: [],
      expenseDate: new Date(),
    },
    mode: "onSubmit",
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "otherExpenses",
  });

  // Custom validation
  const validateForm = (data) => {
    const hasExpenses =
      data.expenses.some((exp) => exp.amount > 0) ||
      (data.otherExpenses && data.otherExpenses.some((exp) => exp.amount > 0));

    if (!hasExpenses) {
      form.setError("expenses", {
        type: "manual",
        message: "At least one expense amount must be added.",
      });
      return false;
    }
    return true;
  };

  // Fetch order details based on selected order ID
  const fetchOrderDetails = (orderId) => {
    setIsLoading(true);
    const order = fetchedOrders.find((o) => o.id.toString() === orderId); // Convert id to string for comparison
    setTimeout(() => { // Simulated delay (remove in production if using real API)
      setSelectedOrder(order || null);
      setIsLoading(false);
    }, 500);
  };

  // Handle form submission
  const onSubmit = async (values) => {
    if (!validateForm(values)) return;

    setIsLoading(true);
    try {
      const filledExpenses = values.expenses.filter(
        (exp) => exp.amount && exp.amount > 0
      );
      const allExpenses = [...filledExpenses, ...(values.otherExpenses || [])];

      const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/api/expenses`, {
        order_id: values.orderId,
        expenses: allExpenses,
        expense_date: format(values.expenseDate, "yyyy-MM-dd"),
      });

      const result = response.data;

      if (response.status === 201) {
        toast.success(
          `${result.data.expense_count} expense(s) added to order ${result.data.order_id}`
        );

        form.reset({
          orderId: "",
          expenses: expenseTypes.map((type) => ({
            type: type.value,
            amount: undefined,
          })),
          otherExpenses: [],
          expenseDate: new Date(),
        });
        setSelectedOrder(null);
      } else {
        toast.error(result.message || "Failed to add expenses");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 419) {
          toast.error("Session expired. Please refresh the page.");
        } else {
          toast.error(
            error.response.data.message || "Failed to submit expenses"
          );
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Expense</CardTitle>
          <CardDescription>Add a new expense related to an order</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Order ID</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? `ARYAN00${fetchedOrders.find((order) => order.id.toString() === field.value)?.id}`
                              : "Select order ID"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search order ID..." />
                          <CommandList>
                            <CommandEmpty>No order found.</CommandEmpty>
                            <CommandGroup>
                              {fetchedOrders.map((order) => (
                                <CommandItem
                                  key={order.id}
                                  value={order.id.toString()}
                                  onSelect={(value) => {
                                    form.setValue("orderId", value); // Store just the numeric ID
                                    fetchOrderDetails(value);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      order.id.toString() === field.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  ARYAN00{order.id}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isLoading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}

              {selectedOrder && !isLoading && (
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Order Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Customer Name</p>
                        <p className="text-sm">{selectedOrder.user_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Order Total</p>
                        <p className="text-sm">₹{parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivered Date</p>
                        <p className="text-sm">{selectedOrder.delivered_date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Products</p>
                        <p className="text-sm">
                          {selectedOrder.products.map(p => p.product_name || 'Unknown').join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-sm">{selectedOrder.status}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm">{selectedOrder.user_address}, {selectedOrder.user_city}, {selectedOrder.user_zip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Expense Types</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter amount for applicable expense types
                  </p>

                  {form.formState.errors.expenses && (
                    <p className="text-sm font-medium text-destructive mb-2">
                      {form.formState.errors.expenses.message}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {expenseTypes.map((type, index) => (
                      <FormField
                        key={type.value}
                        control={form.control}
                        name={`expenses.${index}.amount`}
                        rules={{
                          min: { value: 0, message: "Amount must be positive" },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{type.label}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                  ₹
                                </span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  className="pl-8"
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.valueAsNumber)
                                  }
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-base font-medium mb-2">Other Expenses</h3>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                    >
                      <FormField
                        control={form.control}
                        name={`otherExpenses.${index}.type`}
                        rules={{
                          required: "Please enter expense type",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter expense type"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`otherExpenses.${index}.amount`}
                        rules={{
                          required: "Please enter an amount",
                          min: { value: 0, message: "Amount must be positive" },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                  ₹
                                </span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  className="pl-8"
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.valueAsNumber)
                                  }
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ type: "", amount: undefined })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Other Expense
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="expenseDate"
                rules={{ required: "Please select a date" }}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Expense</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Add Expense"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}