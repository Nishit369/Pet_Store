import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFileDownload, FaSpinner } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable'
applyPlugin(jsPDF)

import { fetchAdminTransactions, setPdfGenerating } from '../../redux/slices/adminTransactionSlice';

const TransactionSummary = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error, generatingPdf } = useSelector(
    (state) => state.adminTransactions
  );
  const [singlePdfGenerating, setSinglePdfGenerating] = useState(false);
  const [currentPdfId, setCurrentPdfId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminTransactions());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const generatePDF = async (transaction) => {
    try {
      setSinglePdfGenerating(true);
      setCurrentPdfId(transaction._id);
      
      console.log('Generating PDF for transaction:', transaction._id);
      
      // Create new jsPDF instance
      const doc = new jsPDF();
      
      // Add logo and header
      doc.setFontSize(22);
      doc.setTextColor(33, 37, 41);
      doc.text('PetConnect', 20, 20);
      
      doc.setFontSize(16);
      doc.text('Transaction Receipt', 20, 30);
      
      // Transaction details
      doc.setFontSize(12);
      doc.setTextColor(73, 80, 87);
      
      const shortId = transaction._id.substring(0, 8);
      doc.text(`Order ID: ${shortId}...`, 20, 45);
      doc.text(`Date: ${formatDate(transaction.createdAt)}`, 20, 52);
      doc.text(`Payment Method: ${transaction.paymentMethod || 'N/A'}`, 20, 59);
      doc.text(`Order Status: ${transaction.status || 'N/A'}`, 20, 66);
      
      // Payment status
      doc.setFont(undefined, 'bold');
      const color = transaction.isPaid ? [40, 167, 69] : [220, 53, 69];
      doc.setTextColor(...color);
      doc.text(`Payment Status: ${transaction.paymentStatus ? transaction.paymentStatus.toUpperCase() : 'N/A'}`, 20, 73);
      
      if (transaction.isPaid && transaction.paidAt) {
        doc.text(`Paid At: ${formatDate(transaction.paidAt)}`, 20, 80);
      }
      
      doc.setFont(undefined, 'normal');
      doc.setTextColor(73, 80, 87);
      
      // Shipping information
      if (transaction.shippingAddress) {
        doc.setFont(undefined, 'bold');
        doc.text('Shipping Address:', 20, 90);
        doc.setFont(undefined, 'normal');
        
        const address = transaction.shippingAddress;
        doc.text(`${address.address || 'N/A'}`, 20, 97);
        doc.text(`${address.city || 'N/A'}, ${address.postalCode || 'N/A'}`, 20, 104);
        doc.text(`${address.country || 'N/A'}`, 20, 111);
      }
      
      // Delivery status
      doc.setFont(undefined, 'bold');
      const deliveryColor = transaction.isDelivered ? [40, 167, 69] : [220, 53, 69];
      doc.setTextColor(...deliveryColor);
      doc.text(`Delivery Status: ${transaction.isDelivered ? 'DELIVERED' : 'NOT DELIVERED'}`, 20, 118);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(73, 80, 87);
      
      // Order Items - using autoTable plugin
      doc.setFont(undefined, 'bold');
      doc.text('Order Items:', 20, 128);
      
      // Create items table
      const tableColumn = ["Item", "Qty", "Price", "Total"];
      const tableRows = [];
      
      // Check if we have orderItems or checkoutItems
      const items = transaction.orderItems || transaction.checkoutItems || [];
      
      if (items && items.length > 0) {
        items.forEach((item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQuantity = parseInt(item.quantity) || 0;
          const itemTotal = itemPrice * itemQuantity;
          
          tableRows.push([
            item.name || 'Unknown Item',
            itemQuantity,
            `$${itemPrice.toFixed(2)}`,
            `$${itemTotal.toFixed(2)}`
          ]);
        });
      }
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 133,
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 40, halign: 'right' },
          3: { cellWidth: 40, halign: 'right' }
        },
        headStyles: {
          fillColor: [73, 80, 87],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        }
      });
      
      // Total amount
      const finalY = doc.previousAutoTable.finalY + 15;
      doc.setFont(undefined, 'bold');
      doc.text('Total Amount:', 130, finalY);
      doc.setTextColor(0, 123, 255);
      const totalPrice = parseFloat(transaction.totalPrice) || 0;
      doc.text(`$${totalPrice.toFixed(2)}`, 170, finalY);
      
      // Footer
      doc.setTextColor(73, 80, 87);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Thank you for shopping with PetConnect!', 75, 270);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 85, 275);
      
      console.log('PDF generated, attempting to save...');
      
      // Save the PDF
      doc.save(`PetConnect-Receipt-${shortId}.pdf`);
      
      console.log('PDF saved successfully');
      setSinglePdfGenerating(false);
      setCurrentPdfId(null);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF: ' + error.message);
      setSinglePdfGenerating(false);
      setCurrentPdfId(null);
    }
  };

  // Generate PDF for multiple transactions
  const generateAllTransactionsPDF = async () => {
    try {
      dispatch(setPdfGenerating(true));
      console.log('Generating summary PDF for all transactions');
      
      // Create new jsPDF instance
      const doc = new jsPDF();
      
      // Add logo and header
      doc.setFontSize(22);
      doc.setTextColor(33, 37, 41);
      doc.text('PetConnect', 20, 20);
      
      doc.setFontSize(16);
      doc.text('Transactions Summary Report', 20, 30);
      
      // Report details
      doc.setFontSize(12);
      doc.setTextColor(73, 80, 87);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 40);
      doc.text(`Total Transactions: ${transactions.length}`, 20, 47);
      
      // Calculate statistics
      const totalSales = transactions.reduce((sum, order) => sum + (parseFloat(order.totalPrice) || 0), 0);
      const paidOrders = transactions.filter(order => order.isPaid).length;
      const paidPercentage = transactions.length > 0 ? 
        (paidOrders / transactions.length * 100).toFixed(1) : "0.0";
      const cancelledOrders = transactions.filter(order => order.status === 'Cancelled').length;
      
      doc.text(`Total Sales: $${totalSales.toFixed(2)}`, 20, 54);
      doc.text(`Paid Orders: ${paidOrders} (${paidPercentage}%)`, 20, 61);
      doc.text(`Cancelled Orders: ${cancelledOrders}`, 20, 68);
      
      // Create transactions table
      const tableColumn = ["Date", "Order ID", "Customer", "Items", "Total", "Payment", "Status"];
      const tableRows = transactions.map(order => {
        const items = order.orderItems || order.checkoutItems || [];
        return [
          formatDate(order.createdAt).split(',')[0], // Just show the date part
          order._id.substring(0, 8),
          order.user && order.user.name ? order.user.name : 'N/A',
          items.length,
          `$${(parseFloat(order.totalPrice) || 0).toFixed(2)}`,
          (order.paymentStatus || 'N/A').toUpperCase(),
          order.status || 'N/A'
        ];
      });
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 75,
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 30 },
          2: { cellWidth: 30 },
          3: { cellWidth: 15, halign: 'center' },
          4: { cellWidth: 25, halign: 'right' },
          5: { cellWidth: 25, halign: 'center' },
          6: { cellWidth: 25, halign: 'center' }
        },
        headStyles: {
          fillColor: [73, 80, 87],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        didParseCell: function(data) {
          // Color the payment status cell based on value
          if (data.column.index === 5) {
            if (data.cell.raw === 'PAID') {
              data.cell.styles.textColor = [40, 167, 69]; // green
            } else if (data.cell.raw === 'PENDING') {
              data.cell.styles.textColor = [255, 193, 7]; // amber
            } else if (data.cell.raw === 'FAILED') {
              data.cell.styles.textColor = [220, 53, 69]; // red
            }
          }
          
          // Color the order status cell based on value
          if (data.column.index === 6) {
            if (data.cell.raw === 'Cancelled') {
              data.cell.styles.textColor = [220, 53, 69]; // red
            } else if (data.cell.raw === 'Delivered') {
              data.cell.styles.textColor = [40, 167, 69]; // green
            } else if (data.cell.raw === 'Processing') {
              data.cell.styles.textColor = [0, 123, 255]; // blue
            }
          }
        }
      });
      
      // Footer
      doc.setTextColor(73, 80, 87);
      doc.setFontSize(10);
      doc.text('PetConnect Admin - Confidential Document', 75, 270);
      
      console.log('Summary PDF generated, attempting to save...');
      
      // Save the PDF
      doc.save(`PetConnect-Transactions-Summary.pdf`);
      
      console.log('Summary PDF saved successfully');
      dispatch(setPdfGenerating(false));
    } catch (error) {
      console.error('Error generating transactions summary PDF:', error);
      alert('Error generating summary PDF: ' + error.message);
      dispatch(setPdfGenerating(false));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transaction Summary</h1>
        <button
          onClick={generateAllTransactionsPDF}
          disabled={generatingPdf}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
        >
          {generatingPdf ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <FaFileDownload className="mr-2" />
              Download All Transactions
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.length > 0 ? (
                transactions.map((transaction) => {
                  const items = transaction.orderItems || transaction.checkoutItems || [];
                  return (
                    <tr key={transaction._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction._id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.user && transaction.user.name ? transaction.user.name : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {items.length} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ${(parseFloat(transaction.totalPrice) || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.isPaid 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.paymentStatus === "pending" 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {(transaction.paymentStatus || 'N/A').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'Processing'
                              ? 'bg-blue-100 text-blue-800'
                              : transaction.status === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.status || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => generatePDF(transaction)}
                          disabled={singlePdfGenerating && currentPdfId === transaction._id}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          {singlePdfGenerating && currentPdfId === transaction._id ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" />
                              Generating...
                            </>
                          ) : (
                            <>
                             {null}
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;