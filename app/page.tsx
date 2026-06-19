"use client";

import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const products: Product[] = [
  { id: "p1", name: "كوب سيراميك دافئ", price: 49, description: "كوب مصنوع يدويًا من السيراميك الفاخر بتصميم ريفي دافئ ومريح لليدين.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop" },
  { id: "p2", name: "شمعة عطرية طبيعية", price: 79, description: "شمعة من شمع الصويا العضوي الفاخر برائحة الفانيليا الدافئة لتهيئة أجواء هادئة.", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop" },
  { id: "p3", name: "حبوب قهوة مختصة", price: 99, description: "محصول قهوة فاخر ومختار بعناية من مرتفعات إثيوبيا بإيحاءات كلاسيكية مميزة.", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop" },
  { id: "p4", name: "دفتر ملاحظات جلدي", price: 120, description: "دفتر أجندة بغلاف مصنوع من الجلد الطبيعي الفاخر باللون البني ومريح جداً للكتابة.", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop" },
  { id: "p5", name: "شوكولاتة داكنة عضوية", price: 35, description: "شوكولاتة داكنة بنسبة 70% محضرة يدوياً بنكهة الكراميل المملح الغنية.", image: "https://images.unsplash.com/photo-1548907040-4d42b52115ca?q=80&w=1000&auto=format&fit=crop" },
  { id: "p6", name: "وعاء خشبي ريفي", price: 150, description: "وعاء تقديم مصنوع من خشب الزيتون الطبيعي بنقوش وتعرجات فريدة وأنيقة.", image: "https://images.unsplash.com/photo-1610701596007-11502861afaa?q=80&w=1000&auto=format&fit=crop" },
  { id: "p7", name: "إبريق تقطير القهوة", price: 165, description: "إبريق لتقطير القهوة برقبة الإوزة لانسياب مثالي، مطلي بالنحاس الكلاسيكي.", image: "https://images.unsplash.com/photo-1577968897464-4bf882181190?q=80&w=1000&auto=format&fit=crop" },
  { id: "p8", name: "حقيبة كتان بيئية", price: 89, description: "حقيبة كتف واسعة مصنوعة من قماش الكتان الطبيعي السميك للاستخدام اليومي.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop" },
  { id: "p9", name: "حافظ جلدي للأكواب", price: 45, description: "حامل أكواب أنيق مصنوع من الجلد الطبيعي لحماية يديك من حرارة المشروبات.", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1000&auto=format&fit=crop" },
  { id: "p10", name: "مبخرة سيراميك حجرية", price: 55, description: "مبخرة عصرية ناعمة بتصميم حجري جذاب لتوزيع البخور بشكل انسيابي.", image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1000&auto=format&fit=crop" },
  { id: "p11", name: "مطحنة قهوة خشبية", price: 135, description: "مطحنة حبوب يدوية بتروس سيراميك متينة وهيكل خشبي ناعم وناصع.", image: "https://images.unsplash.com/photo-1588244908146-239567b31c7f?q=80&w=1000&auto=format&fit=crop" },
  { id: "p12", name: "صندوق هدايا المتجر", price: 70, description: "صندوق كرتوني سميك بلون بني كلاسيكي مزين بشريط قماشي فخم للإهداء.", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" }
];

interface CartItem extends Product {
  qty: number;
}

export default function HomePage() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // حسابات السلة تم تقديمها للأعلى لتجنب مشاكل القراءة والخطوط الحمراء
  const totalItemsCount = cartItems.reduce((acc: number, item: CartItem) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.qty, 0);
  const shippingCost = totalPrice > 0 ? 25 : 0;
  const finalTotal = totalPrice + shippingCost;

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setCurrentView("detail");
  };

  const addToCart = (product: Product, qty: number) => {
    setCartItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((item: CartItem) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item: CartItem) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevItems, { ...product, qty }];
    });
    alert(`تمت إضافة ${qty} من (${product.name}) إلى السلة!`);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item: CartItem) => item.id !== id));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("متصفحك لا يدعم خاصية تحديد الموقع الجغرافي.");
      return;
    }
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCustomerAddress(`الموقع الفعلي: (خط العرض: ${latitude.toFixed(4)}, خط الطول: ${longitude.toFixed(4)})`);
        setIsLoadingLocation(false);
      },
      () => {
        alert("تعذر جلب موقعك، يرجى تفعيل الـ GPS والسماح للمتصفح بالوصول.");
        setIsLoadingLocation(false);
      }
    );
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("الرجاء تعبئة جميع الحقول المطلوبة.");
      return;
    }

    const productsList = cartItems.map((item: CartItem) => `- ${item.name} (الكمية: ${item.qty}) -> بسعر: ${item.price * item.qty} ر.س`).join("\n");
    const message = `طلب جديد من المتجر ✨\n\n👤 الاسم: ${customerName}\n📱 الجوال: ${customerPhone}\n📍 العنوان: ${customerAddress}\n\n📦 المنتجات:\n${productsList}\n\n💵 تكلفة الشحن: ${shippingCost} ر.س\n💰 الإجمالي الكلي: ${finalTotal} ر.س`;
    
    const myPhoneNumber = "966594547496"; 
    window.open(`https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    
    setCartItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setCurrentView("home");
  };

  const inputStyle: React.CSSProperties | { [key: string]: string | number } = {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "2px solid #000000",
    fontFamily: "inherit",
    fontSize: "1rem",
    backgroundColor: "#ffffff",
    color: "#000000",
    outline: "none",
    boxSizing: "border-box"
  };

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", direction: "rtl", backgroundColor: "#f7f2ed", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 onClick={() => setCurrentView("home")} style={{ margin: 0, fontSize: "2.5rem", color: "#5c3a21", fontWeight: "bold", cursor: "pointer" }}>
          متجري
        </h1>
        <button onClick={() => setIsCartOpen(true)} style={{ color: "white", backgroundColor: "#5c3a21", border: "none", padding: "10px 20px", borderRadius: 20, fontWeight: "600", cursor: "pointer", display: "flex", gap: 8, alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <span>🛒 السلة</span>
          <span style={{ backgroundColor: "#7a5230", padding: "2px 8px", borderRadius: "50%", fontSize: "0.85rem", fontWeight: "bold" }}>{totalItemsCount}</span>
        </button>
      </header>

      {currentView === "home" && (
        <div>
          <p style={{ marginTop: 16, color: "#333", fontWeight: "500" }}>اختاري منتج:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {products.map((p) => (
              <div key={p.id} style={{ border: "1px solid #d1c7bd", borderRadius: 16, padding: 16, backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: 12, marginBottom: 12 }} />
                <h3 style={{ margin: "0 0 8px", color: "#5c3a21", fontSize: "1.2rem" }}>{p.name}</h3>
                <div style={{ marginBottom: 12, fontWeight: "bold", color: "#7a5230", fontSize: "1.1rem" }}>{p.price} ر.س</div>
                <button onClick={() => viewProductDetails(p)} style={{ color: "#0066cc", background: "none", border: "none", padding: 0, textAlign: "right", font: "inherit", fontWeight: "600", cursor: "pointer" }}>عرض المنتج ←</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === "detail" && (
        <div>
          <button onClick={() => setCurrentView("home")} style={{ color: "#5c3a21", background: "none", border: "none", padding: 0, font: "inherit", fontWeight: "600", cursor: "pointer", marginBottom: 24 }} > ← العودة لجميع المنتجات </button>
          {selectedProduct && (
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #d1c7bd", borderRadius: 20, padding: 32, boxShadow: "0 6px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 24 }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: 16 }} />
              <div>
                <h1 style={{ color: "#5c3a21", margin: "0 0 16px 0" }}>{selectedProduct.name}</h1>
                <p style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: 24 }}>{selectedProduct.description}</p>
                <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#7a5230", marginBottom: 24 }}>السعر: {selectedProduct.price} ر.س</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <span style={{ fontWeight: "bold", color: "#000" }}>الكمية:</span>
                  <div style={{ display: "flex", alignItems: "center", border: "2px solid #000", borderRadius: 8, overflow: "hidden" }}>
                    <button onClick={() => setQuantity((q: number) => Math.max(1, q - 1))} style={{ padding: "8px 16px", backgroundColor: "#fff", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>-</button>
                    <span style={{ fontWeight: "bold", minWidth: 40, textAlign: "center" }}>{quantity}</span>
                    <button onClick={() => setQuantity((q: number) => q + 1)} style={{ padding: "8px 16px", backgroundColor: "#fff", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>+</button>
                  </div>
                </div>
                <button onClick={() => addToCart(selectedProduct, quantity)} style={{ backgroundColor: "#5c3a21", color: "white", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: "1.1rem", cursor: "pointer", fontWeight: "bold" }}>إضافة إلى السلة 🛒</button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === "checkout" && (
        <div>
          <button onClick={() => setCurrentView("home")} style={{ color: "#5c3a21", background: "none", border: "none", padding: 0, font: "inherit", fontWeight: "600", cursor: "pointer", marginBottom: 24 }} > ← إلغاء والعودة للمتجر </button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            <div style={{ backgroundColor: "white", padding: 24, borderRadius: 16, border: "1px solid #d1c7bd" }}>
              <h2 style={{ color: "#5c3a21", marginTop: 0, marginBottom: 20 }}>معلومات الشحن والتوصيل</h2>
              <form onSubmit={handleCheckoutSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>الاسم الكامل *</label>
                  <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={inputStyle} placeholder="اسم المستلم الفعلي" />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>رقم الجوال *</label>
                  <input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} placeholder="05xxxxxxxx" />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>عنوان التوصيل بالتفصيل *</label>
                  <button type="button" onClick={handleGetLocation} disabled={isLoadingLocation} style={{ width: "100%", backgroundColor: "#e0d4c8", color: "#5c3a21", border: "2px dashed #5c3a21", padding: "10px", borderRadius: "8px", fontWeight: "bold", marginBottom: "10px", cursor: "pointer" }}>
                    📍 {isLoadingLocation ? "جاري تحديد مكانك..." : "تحديد موقعي التلقائي عبر الخريطة"}
                  </button>
                  <textarea required rows={3} value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} style={{ ...inputStyle, resize: "none" }} placeholder="المدينة، الحي، اسم الشارع" />
                </div>

                <button type="submit" style={{ backgroundColor: "#25D366", color: "white", border: "none", padding: "14px", borderRadius: 10, fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  تأكيد الطلب عبر الواتساب 💬
                </button>
              </form>
            </div>

            <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 16, border: "1px solid #d1c7bd", height: "fit-content" }}>
              <h2 style={{ color: "#5c3a21", marginTop: 0, marginBottom: 20 }}>ملخص الطلب</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, maxHeight: 250, overflowY: "auto" }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f5f5f5", paddingBottom: 8 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <img src={item.image} alt={item.name} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }} />
                      <div>
                        <span style={{ fontWeight: "600", display: "block" }}>{item.name}</span>
                        <span style={{ fontSize: "0.85rem", color: "#666" }}>الكمية: {item.qty}</span>
                      </div>
                    </div>
                    <span style={{ fontWeight: "600", color: "#7a5230" }}>{item.price * item.qty} ر.س</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "2px dashed #eee", paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}><span>مجموع المنتجات:</span><span>{totalPrice} ر.س</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}><span>تكلفة الشحن والتوصيل:</span><span>{shippingCost} ر.س</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.3rem", color: "#5c3a21", marginTop: 8 }}><span>الإجمالي الكلي:</span><span>{finalTotal} ر.س</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: "360px", height: "100vh", backgroundColor: "#ffffff", boxShadow: "-4px 0 16px rgba(0,0,0,0.15)", zIndex: 100, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: 12, marginBottom: 16 }}>
              <h2 style={{ margin: 0, color: "#5c3a21" }}>سلة المشتريات</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: "none", border: "none", fontSize: "1.8rem", cursor: "pointer", color: "#000", fontWeight: "bold" }}>×</button>
            </div>
            {cartItems.length === 0 ? ( <p style={{ color: "#777", textAlign: "center", marginTop: 40 }}>السلة فارغة حالياً 🧺</p> ) : (
              <div style={{ overflowY: "auto", maxHeight: "65vh" }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", borderBottom: "1px solid #f9f9f9", paddingBottom: 12 }}>
                    <img src={item.image} alt={item.name} style={{ width: 65, height: 65, objectFit: "cover", borderRadius: 8 }} />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ margin: "0 0 4px 0", color: "#5c3a21" }}>{item.name}</h4>
                      <div style={{ fontSize: "0.9rem", color: "#7a5230", fontWeight: "600" }}>{item.price} ر.س × {item.qty}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ff3333", cursor: "pointer", fontSize: "0.9rem", fontWeight: "bold" }}>حذف</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div style={{ borderTop: "1px solid #eee", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.2rem", color: "#5c3a21", marginBottom: 16 }}><span>الإجمالي:</span><span>{totalPrice} ر.س</span></div>
              <button onClick={() => { setIsCartOpen(false); setCurrentView("checkout"); }} style={{ width: "100%", backgroundColor: "#5c3a21", color: "white", border: "none", padding: "14px", borderRadius: 10, fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer" }}> إتمام الطلب والدفع ✨ </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}