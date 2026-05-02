import { useGetInvoiceQuery } from "@/redux/api/orderApi";

const InvoicePage = ({ orderId }: { orderId: string }) => {
  const { data, isLoading, error } = useGetInvoiceQuery(orderId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <h2>Invoice No: {data?.invoiceNo}</h2>

      <p>Date: {data?.date}</p>

      <h3>Customer</h3>
      <p>{data?.customer?.fullName}</p>

      <h3>Items</h3>
      {data?.items?.map((item) => (
        <div key={item.productId}>
          <p>{item.name}</p>
          <p>Price: {item.price}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}

      <h3>Total: {data?.subtotal}</h3>
    </div>
  );
};

export default InvoicePage;