import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

export default function Admin() {
  // Data States
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State for Adding Products
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Jackets');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  // Helper for formatting timestamps
  const formatDate = (dateValue) => {
    if (!dateValue) return 'Recent';
    if (typeof dateValue.toDate === 'function') {
      return dateValue.toDate().toLocaleString();
    }
    if (dateValue instanceof Date) {
      return dateValue.toLocaleString();
    }
    const parsed = new Date(dateValue);
    return isNaN(parsed.getTime()) ? 'Recent' : parsed.toLocaleString();
  };

  // ---------------- Fetch Data from Firestore ----------------
  useEffect(() => {
    let isMounted = true;

    const fetchAdminData = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = ordersSnapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));

        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsData = productsSnapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));

        let messagesData = [];
        try {
          const msgQuery = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
          const msgSnapshot = await getDocs(msgQuery);
          messagesData = msgSnapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
        } catch {
          const msgSnapshot = await getDocs(collection(db, 'contact_messages'));
          messagesData = msgSnapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
        }

        let subscribersData = [];
        try {
          const subQuery = query(collection(db, 'subscribers'), orderBy('subscribedAt', 'desc'));
          const subSnapshot = await getDocs(subQuery);
          subscribersData = subSnapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
        } catch {
          const subSnapshot = await getDocs(collection(db, 'subscribers'));
          subscribersData = subSnapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
        }

        if (isMounted) {
          setOrders(ordersData);
          setProducts(productsData);
          setMessages(messagesData);
          setSubscribers(subscribersData);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAdminData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ---------------- Handlers for Orders ----------------
  const handleApproveOrder = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: 'APPROVED' });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'APPROVED' } : o))
      );
    } catch (error) {
      console.error('Error approving order:', error);
      alert('Failed to approve order.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  // ---------------- Handlers for Products ----------------
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!title.trim() || price === '' || isNaN(Number(price))) {
      alert('Please fill in a valid Title and Price');
      return;
    }

    setSubmitting(true);
    try {
      const newProduct = {
        title: title.trim(),
        price: parseFloat(price) || 0,
        category: category || 'Jackets',
        image: image ? image.trim() : '',
        description: description ? description.trim() : '',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'products'), newProduct);
      setProducts((prev) => [...prev, { id: docRef.id, ...newProduct, createdAt: new Date() }]);

      // Reset Form
      setTitle('');
      setPrice('');
      setCategory('Jackets');
      setImage('');
      setDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add clothing item.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  // ---------------- Handler to Update All Photos ----------------
  const handleUpdateAllCollectionPhotos = async () => {
    const newImageUrl = prompt("Please enter the new Image URL for all data:");
    if (!newImageUrl || !newImageUrl.trim()) return;

    const targetCollections = ['products', 'orders']; 
    let totalUpdated = 0;

    try {
      setSubmitting(true);

      for (const colName of targetCollections) {
        const snapshot = await getDocs(collection(db, colName));
        
        const updatePromises = snapshot.docs.map((docItem) => {
          const data = docItem.data();

          if (Array.isArray(data.items)) {
            const updatedItems = data.items.map((item) => ({
              ...item,
              image: newImageUrl.trim(),
              photo: newImageUrl.trim(),
            }));
            return updateDoc(doc(db, colName, docItem.id), { items: updatedItems });
          }

          return updateDoc(doc(db, colName, docItem.id), {
            image: newImageUrl.trim(),
            photo: newImageUrl.trim(),
          });
        });

        await Promise.all(updatePromises);
        totalUpdated += snapshot.docs.length;
      }

      setProducts((prev) => prev.map((p) => ({ ...p, image: newImageUrl.trim() })));
      alert(`Successfully updated photos for ${totalUpdated} records!`);
    } catch (error) {
      console.error('Error updating photos:', error);
      alert('Failed to update photos.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>Loading Clothing Admin Panel...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Clothing Store Admin <span style={{ fontSize: '24px' }}>👕</span>
          </h1>
          <p style={styles.subtitle}>
            Manage Clothing Apparel, Orders, Customer Messages & Subscribers
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={handleUpdateAllCollectionPhotos} 
            style={styles.approveBtn}
            disabled={submitting}
          >
            🖼️ Change All Photos
          </button>
          <span style={styles.roleBadge}>ADMIN DASHBOARD</span>
        </div>
      </div>

      {/* Orders Section */}
      <div style={styles.sectionCard}>
        <h3 style={styles.sectionTitle}>
          📥 Customer Orders <span style={styles.counterBadge}>{orders.length}</span>
        </h3>

        {orders.length === 0 ? (
          <p style={styles.emptyText}>No pending orders.</p>
        ) : (
          <div style={styles.ordersGrid}>
            {orders.map((order) => (
              <div key={order.id} style={styles.orderCard}>
                <div style={styles.orderTopRow}>
                  <div>
                    <strong style={styles.emailText}>
                      {order.customerName || order.email || order.customerEmail || 'Customer'}
                    </strong>
                    {order.address && (
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                        📍 {order.address}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: order.status === 'APPROVED' ? '#d1fae5' : '#fef3c7',
                      color: order.status === 'APPROVED' ? '#047857' : '#d97706',
                    }}
                  >
                    {order.status || 'PENDING'}
                  </span>
                </div>

                {/* Items List */}
                <div style={styles.itemsListContainer}>
                  <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '13px', color: '#374151' }}>
                    Purchased Items:
                  </p>
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={item.id || index} style={styles.itemBox}>
                        <p style={styles.itemDetail}><strong>ID:</strong> {item.id}</p>
                        <p style={styles.itemDetail}><strong>Name:</strong> {item.name}</p>
                        <p style={styles.itemDetail}><strong>Title:</strong> {item.title}</p>
                        <p style={styles.itemPrice}><strong>Price:</strong> {item.price}</p>
                      </div>
                    ))
                  ) : (
                    <div style={styles.itemBox}>
                      <p style={styles.itemDetail}><strong>Item:</strong> {order.title || 'Clothing Item'}</p>
                      <p style={styles.itemPrice}><strong>Price:</strong> ${order.price || '0.00'}</p>
                    </div>
                  )}
                </div>

                <div style={styles.cardActions}>
                  {order.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleApproveOrder(order.id)}
                      style={styles.approveBtn}
                    >
                      ✓ Approve Order
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    style={styles.deleteBtnText}
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Operations Grid */}
      <div style={styles.bottomLayout}>
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Add New Clothing Item 👔</h3>
          <form onSubmit={handleAddProduct} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Title *</label>
              <input
                type="text"
                placeholder="e.g. Vintage Denim Jacket"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 49.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Clothing Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.input}
              >
                <option value="Jackets">Jackets</option>
                <option value="Dress">Dress</option>
                <option value="Skirts">Skirts</option>
                <option value="Summer Set">Summer Set</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Image URL (Optional)</label>
              <input
                type="text"
                placeholder="https://..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description (Optional)</label>
              <textarea
                placeholder="Fabric details, fit guide, sizes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...styles.input, height: '70px', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }} 
              disabled={submitting}
            >
              {submitting ? 'Adding Item...' : '+ Add Clothing Item'}
            </button>
          </form>
        </div>

        <div style={styles.listSection}>
          <h3 style={styles.listTitle}>Clothing Inventory ({products.length})</h3>
          {products.length === 0 ? (
            <div style={styles.emptyBox}>No clothing items added yet.</div>
          ) : (
            <div style={styles.productsGrid}>
              {products.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      style={styles.productImg}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', color: '#1f2937' }}>{product.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#4b5563' }}>
                      Category: <strong>{product.category || 'Apparel'}</strong>
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#4f46e5' }}>
                      ${product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    style={styles.deleteBtnText}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div style={{ ...styles.sectionCard, marginTop: '25px' }}>
        <h3 style={styles.sectionTitle}>
          📬 Contact Messages <span style={styles.counterBadge}>{messages.length}</span>
        </h3>
        {messages.length === 0 ? (
          <p style={styles.emptyText}>No messages received yet.</p>
        ) : (
          <div style={styles.msgGrid}>
            {messages.map((item) => (
              <div key={item.id} style={styles.msgCard}>
                <h4 style={{ margin: '0 0 6px 0', color: '#1e1b4b' }}>
                  {item.subject || 'No Subject'}
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#4b5563' }}>
                  <strong>From:</strong> {item.name} ({item.email})
                </p>
                <p style={styles.msgBody}>{item.message}</p>
                <small style={styles.dateText}>
                  {formatDate(item.createdAt)}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscribers */}
      <div style={styles.sectionCard}>
        <h3 style={styles.sectionTitle}>
          📧 Newsletter Subscribers <span style={styles.counterBadge}>{subscribers.length}</span>
        </h3>
        {subscribers.length === 0 ? (
          <p style={styles.emptyText}>No subscribers yet.</p>
        ) : (
          <ul style={styles.subList}>
            {subscribers.map((sub) => (
              <li key={sub.id} style={styles.subItem}>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>{sub.email}</span>
                <small style={styles.dateText}>
                  {formatDate(sub.subscribedAt)}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1150px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  title: { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '14px', marginTop: '4px' },
  roleBadge: {
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '25px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 0,
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  counterBadge: {
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    fontSize: '12px',
    borderRadius: '12px',
    padding: '2px 10px',
    fontWeight: '700',
  },
  emptyText: { color: '#94a3b8', fontSize: '14px', margin: 0 },
  ordersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '16px',
  },
  orderCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  },
  orderTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  emailText: { color: '#1f2937', fontSize: '15px' },
  statusBadge: { fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px' },
  itemsListContainer: { marginBottom: '14px' },
  itemBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #f1f5f9',
    borderRadius: '8px',
    padding: '8px 10px',
    marginBottom: '6px',
  },
  itemDetail: { margin: '2px 0', fontSize: '12px', color: '#475569' },
  itemPrice: { margin: '2px 0', fontSize: '12px', color: '#4f46e5', fontWeight: 'bold' },
  cardActions: { display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' },
  
  approveBtn: { 
    border: '1px solid #a7f3d0', 
    backgroundColor: '#ecfdf5', 
    color: '#047857', 
    fontWeight: '700', 
    fontSize: '12px', 
    padding: '6px 14px', 
    borderRadius: '20px', 
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  deleteBtnText: { 
    border: '1px solid #fecdd3', 
    backgroundColor: '#fff1f2', 
    color: '#e11d48', 
    fontWeight: '700', 
    fontSize: '12px', 
    padding: '6px 14px', 
    borderRadius: '20px', 
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  
  bottomLayout: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid #e2e8f0',
    height: 'fit-content',
  },
  formTitle: { fontSize: '18px', fontWeight: '700', color: '#0f172a', marginTop: 0, marginBottom: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#475569' },
  input: { padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', backgroundColor: '#f8fafc' },
  
  submitBtn: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '6px',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
  },
  
  listSection: { display: 'flex', flexDirection: 'column' },
  listTitle: { fontSize: '18px', fontWeight: '700', color: '#0f172a', marginTop: 0, marginBottom: '16px' },
  emptyBox: { border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' },
  productsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  productCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '14px 18px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  },
  productImg: { width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' },
  msgGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  msgCard: { backgroundColor: '#fef2f2', padding: '16px', borderRadius: '12px', border: '1px solid #fee2e2' },
  msgBody: { backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', fontSize: '13px', color: '#374151', margin: '8px 0' },
  subList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' },
  subItem: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  dateText: { color: '#94a3b8', fontSize: '12px' },
};