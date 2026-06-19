"use client";

import React, { useState } from "react";

// واجهة تعريف نوع المنتج
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// واجهة تعريف عناصر السلة
interface CartItem extends Product {
  quantity: number;
}

// مصفوفة المنتجات (يمكنكِ تعديل الروابط والصور مستقبلاً بكل سهولة)
const products: Product[] = [
  {
    id: 1,
    name: "كوب سيراميك دافئ",
    price: 49,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400",
    description: "كوب مصنوع يدوياً من السيراميك الفاخر ليحفظ حرارة قهوتك."
  },
  {
    id: 2,
    name: "شمعة عطرية طبيعية",
    price: 79,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400",
    description: "شمعة من شمع الصويا الطبيعي بنفحات اللافندر والفانيليا المهدئة."
  },
  {
    id: 3,
    name: "حبوب قهوة مختصة",
    price: 99,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400",
    description: "حبوب قهوة كاملة محمصة بعناية تناسب مشروبات المقطرة والإسبريسو."
  },
  {
    id: 4,
    name: "دفتر ملاحظات جلدي",
    price: 120,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=400",
    description: "دفتر ملاحظات بغلاف من الجلد الطبيعي لحفظ أفكارك اليومية."
  },
  {
    id: 5,
    name: "حقيبة كتان بيئية",
    price: 69,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400",
    description: "حقيبة كتف متينة ومصنوعة من مواد صديقة للبيئة للاستخدام اليومي."
  },
  {
    id: 6,
    name: "إبريق تقطير القهوة",
    price: 165,
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=400",
    description: "إبريق ستانلس ستيل بعنق البجعة لتدفق مياه مثالي وموزع بدقة."
  }
];

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "cart">("home");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // المتغيرات الجديدة الخاصة ببيانات الزبون والمدينة
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("المدينة المنورة");
  const [customerAddress, setCustomerAddress] = useState("");

  // إضافة منتج إلى السلة
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // تحديث كمية المنتج في السلة
  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // حساب إجمالي السعر
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // إرسال الطلب عبر الواتساب شامل المدينة والعنوان بالتفصيل
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const myPhoneNumber = "966594547496"; // رقم الواتساب الخاص بكِ

    const itemsText = cartItems
      .map((item) => `- ${item.name} (عدد: ${item.quantity}) بسعر: ${item.price * item.quantity} ر.س`)
      .join("\n");

    const messageText =
      `*طلب جديد من المتجر الإلكتروني* 🛍️\n\n` +
      `*المنتجات المطلوبة:*\n${itemsText}\n\n` +
      `*الإجمالي النهائي:* ${totalPrice} ر.س\n\n` +
      `*بيانات الشحن والتوصيل:*\n` +
      `👤 الاسم: ${customerName}\n` +
      `📱 رقم الجوال: ${customerPhone}\n` +
      `📍 المدينة: ${customerCity}\n` +
      `🏠 العنوان بالتفصيل: ${customerAddress}`;

    window.open(`https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(messageText)}`);

    // تنظيف الحقول والسلة تلقائياً بعد إرسال الطلب
    setCartItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerCity("المدينة المنورة");
    setCustomerAddress("");
    setIsCartOpen(false);
    setCurrentView("home");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #000000",
    fontFamily: "inherit",
    fontSize: "1rem",
    boxSizing: "border-box"
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#fcf9f5", color: "#333", minHeight: "100vh", direction: "rtl" }}>
      {/* الهيدر العلوي */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", backgroundColor: "#ffffff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 50 }}>
        <h1 style={{ margin: 0, fontSize: "1.8rem", color: "#4a3c31", cursor: "pointer" }} onClick={() => { setCurrentView("home"); setIsCartOpen(false); }}>
          متجري المتميز
        </h1>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          style={{ padding: "10px 20px", backgroundColor: "#4a3c31", color: "#fff", border: "none", borderRadius: "25px", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <span>🛒 السلة</span>
          <span style={{ backgroundColor: "#fff", color: "#4a3c31", padding: "2px 8px", borderRadius: "50%", fontSize: "0.9rem", fontWeight: "bold" }}>
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </button>
      </header>

      {/* الواجهة الرئيسية للمنتجات */}
      {currentView === "home" && (
        <main style={{ padding: "40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            {products.map((product) => (
              <div key={product.id} style={{ backgroundColor: "#ffffff", borderRadius: "12px", overflow: "hidden", border: "1px solid #eaeaea", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
                <img src={product.image} alt={product.name} style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: "1.3rem", color: "#4a3c31" }}>{product.name}</h3>
                  <p style={{ margin: "0 0 15px 0", fontSize: "0.95rem", color: "#666", lineHeight: 1.5, flexGrow: 1 }}>{product.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4a3c31" }}>{product.price} ر.س</span>
                    <button
                      onClick={() => addToCart(product)}
                      style={{ padding: "8px 16px", backgroundColor: "#b58263", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem" }}
                    >
                      إضافة للسلة +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* شريط السلة الجانبي ونموذج الشحن الخفيف */}
      {isCartOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", justifyContent: "flex-start" }}>
          <div style={{ width: "100%", maxWidth: "450px", backgroundColor: "#fff", height: "100%", padding: "30px", boxSizing: "border-box", display: "flex", flexDirection: "column", overflowY: "auto", boxShadow: "5px 0 15px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "2px solid #eee", paddingBottom: "15px" }}>
              <h2 style={{ margin: 0, color: "#4a3c31" }}>سلة المشتريات</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#aaa" }}>✕</button>
            </div>

            {cartItems.length === 0 ? (
              <p style={{ textAlign: "center", color: "#777", marginTop: "40px" }}>السلة فارغة حالياً 🧐</p>
            ) : (
              <>
                {/* عرض المنتجات داخل السلة */}
                <div style={{ flexGrow: 1, overflowY: "auto", marginBottom: "20px" }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: "15px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                      <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" }} />
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ margin: "0 0 5px 0", fontSize: "1rem", color: "#4a3c31" }}>{item.name}</h4>
                        <span style={{ fontSize: "0.95rem", color: "#b58263", fontWeight: "bold" }}>{item.price * item.quantity} ر.س</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>+</button>
                        <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>-</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "2px solid #eee", paddingTop: "15px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold", color: "#4a3c31" }}>
                    <span>الإجمالي:</span>
                    <span>{totalPrice} ر.س</span>
                  </div>
                </div>

                {/* نموذج الشحن البديل التلقائي لخطوط الطول والعرض */}
                <form onSubmit={handleCheckoutSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3 style={{ margin: "10px 0 5px 0", fontSize: "1.1rem", color: "#4a3c31", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>بيانات التوصيل لشحن سريع:</h3>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "0.9rem" }}>الاسم الكريم:</label>
                    <input type="text" placeholder="اكتب اسمك الكامل" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={inputStyle} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "0.9rem" }}>رقم الجوال:</label>
                    <input type="tel" placeholder="05xxxxxxxx" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required style={inputStyle} />
                  </div>

                  {/* قائمة اختيار المدينة المنسدلة بديلة الجيولكيشن */}
                  <div>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "0.9rem" }}>المدينة:</label>
                    <select value={customerCity} onChange={(e) => setCustomerCity(e.target.value)} required style={inputStyle}>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="الدمام">الدمام</option>
                      <option value="القصيم">القصيم</option>
                      <option value="أبها">أبها</option>
                    </select>
                  </div>

                  {/* حقل تفاصيل العنوان النصي المباشر */}
                  <div>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "0.9rem" }}>العنوان بالتفصيل (الحي / الشارع):</label>
                    <input type="text" placeholder="مثال: حي العزيزية - شارع الإمام البخاري" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} required style={inputStyle} />
                  </div>

                  <button
                    type="submit"
                    style={{ width: "100%", padding: "14px", backgroundColor: "#25D366", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
                  >
                    🟢 تأكيد الطلب وإرسال عبر واتساب
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}