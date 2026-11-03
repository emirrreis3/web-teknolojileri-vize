# Web Teknolojileri — Vize Projesi (Sprint 6)
**Router, Context ve Yönetim (18 Adım)**

**Canlı Dağıtım (Vercel):** [https://emir-demir-frontend.vercel.app](https://emirdemir-frontend.vercel.app/)  
*(Alternatif / Vercel Dağıtım Bağlantınız: `https://emirdemir-frontend.vercel.app`)*  


---

## Öğrenci Bilgileri
* **Adı Soyadı:** Emir Demir
* **Öğrenci Numarası:** 2416501048
* **Bölüm:** Bilgisayar Mühendisliği
* **Ders:** Web Teknolojileri ve Programlama
* **Özel Stil:** Font: `system-ui, sans-serif` | Renk Tonu (`--ton`): `328` (`2416501048 mod 360 = 328`) (Fuşya / Pembe)
* **Künye (Footer):** `Emir Demir · 2416501048 · 2026`

---

## Proje Tanımı ve Hedefleri
Bu proje, tek sayfalık uygulamayı (SPA) React Router DOM v7 ve React Context API kullanarak dinamik, yönetilebilir ve tam erişilebilir gerçek web adreslerine kavuşturmaktadır:
1. **React Router DOM (BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate, useLocation):** Sayfalar arası geçişlerde tarayıcı geçmişi, geri/ileri butonları ve doğrudan URL ile erişim desteklenir.
2. **Global State Yönetimi (EventsContext & EventsProvider):** Etkinlik verisi, ekleme (`addEvent`), güncelleme (`updateEvent`) ve silme (`deleteEvent`) işlemleri tek merkezde toplanarak tüm sayfalara (Ana Sayfa, Etkinlikler, Detay, Yönetim) prop drilling olmadan anında yansıtılır.
3. **Controlled Formlar ve Doğrulama (Validation):** Etkinlik ekleme/güncelleme formu ile Giriş, Kayıt ve Şifremi Unuttum formları iki yönlü veri bağlama (controlled components) ve saf doğrulama fonksiyonları (`validateEvent`, vb.) ile donatılmıştır. Hatalar anlık olarak görsel ve erişilebilir (`aria-invalid`, `.hata-metni`) şekilde sunulur.
4. **Yönetim Paneli (Admin CRUD):** Etkinliklerin tablo halinde listelenmesi, yeni etkinlik ekleme, var olanı güncelleme ve silmeden önce onay kutusu (`window.confirm`) ile güvenli silme imkânı.
5. **Duyarlı (Responsive) Tasarım:** Masaüstünde 3 ve 2 sütunlu grid, geniş tablo; mobil ekranlarda (<=699px) ise tablonun `data-baslik` ile otomatik olarak modern kart görünümüne dönüşmesi.

---

## Route (Adres) Haritası (10 Adet Sayfa)

| # | Adres | Sayfa Bileşeni | Açıklama |
|---|-------|----------------|----------|
| 1 | `/` | `HomePage` | Yaklaşan ilk 2 etkinliği tarihe göre sıralı listeler, "Tüm etkinlikleri gör" butonu barındırır. |
| 2 | `/events` | `EventsPage` | Arama ve kategori filtreleme ile tüm etkinlikleri listeler; sonuç sayısını gösterir. |
| 3 | `/events/:id` | `EventDetailPage` | `useParams` ile id'yi okur, etkinliğin afişini, künyesini (`dl`) ve açıklamasını sunar. |
| 4 | `/admin` | `AdminPage` | Yönetim tablosu; etkinlikleri listeler, "Düzenle" ve onaylı "Sil" butonları içerir. |
| 5 | `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu (`EventForm`), kayıt sonrası `/admin`'e yönlendirir. |
| 6 | `/admin/:id/edit` | `EditEventPage` | Seçili etkinliği güncelleme formu (`EventForm`), kayıt sonrası `/admin`'e yönlendirir. |
| 7 | `/login` | `LoginPage` | E-posta ve şifre doğrulamalı giriş sayfası. |
| 8 | `/register` | `RegisterPage` | Ad Soyad, e-posta, şifre ve şifre tekrarı doğrulamalı kayıt sayfası. |
| 9 | `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama e-posta gönderim simülasyonu. |
| 10 | `*` | `NotFoundPage` | Tanımsız adresler veya bulunamayan etkinlikler için 404 sayfası ve ana sayfaya dönüş butonu. |

---

## Proje Klasör Yapısı (`src/`)

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Adrese ve seçili etkinliğe göre dinamik başlık ve alt açıklama
│   │   ├── Navigation.tsx    # NavLink ile aktif sayfayı vurgulayan menü
│   │   └── Footer.tsx        # Öğrenci künyesi (Emir Demir · 2416501048 · 2026)
│   ├── events/
│   │   ├── EventCard.tsx     # Tekil etkinlik kartı (/events/:id bağlantılı)
│   │   ├── EventList.tsx     # Etkinlikleri map eden liste ve boş durum yönetimi
│   │   ├── EventFilter.tsx   # Etkinlik arama ve kategori seçici bileşeni
│   │   └── EventDetail.tsx   # Etkinlik afişi, künyesi ve geri/güncelle butonları
│   └── forms/
│       └── EventForm.tsx     # Ekle ve Güncelle sayfalarında kullanılan controlled form
├── context/
│   └── EventsContext.tsx     # EventsProvider ve useEvents custom hook (CRUD operasyonları)
├── pages/
│   ├── HomePage.tsx          # Ana sayfa (yaklaşan 2 etkinlik)
│   ├── EventsPage.tsx        # Etkinlikler listesi ve arama/filtreleme
│   ├── EventDetailPage.tsx    # Tekil etkinlik detay sayfası (useParams)
│   ├── AdminPage.tsx         # Etkinlik yönetim tablosu (+ yeni etkinlik, düzenle, sil)
│   ├── AddEventPage.tsx      # Yeni etkinlik ekleme sayfası
│   ├── EditEventPage.tsx     # Etkinlik güncelleme sayfası
│   ├── LoginPage.tsx         # Giriş sayfası (doğrulamalı)
│   ├── RegisterPage.tsx      # Kayıt sayfası (doğrulamalı)
│   ├── ForgotPasswordPage.tsx# Şifremi unuttum sayfası
│   └── NotFoundPage.tsx      # 404 Sayfa bulunamadı bileşeni
├── data/
│   └── events.ts             # 6 adet kanonik örnek etkinlik verisi
├── types/
│   └── campus-event.ts       # Category, CampusEvent, EventFormData, EventFormErrors tipleri
├── utils/
│   ├── filter-events.ts      # searchEvents, filterByCategory ve findEventById yardımcıları
│   ├── format-date.ts        # Türkçe yerel tarih formatlayıcı
│   └── validate-event.ts     # Etkinlik formu saf doğrulama fonksiyonu
├── App.css                   # Emir Demir özel stil tonu (--ton: 328), responsive ve tema kuralları
├── App.tsx                   # Ana iskelet (Header, Navigation, Routes, Footer)
├── index.css                 # Temel kök stiller
└── main.tsx                  # BrowserRouter ve EventsProvider sarmalayıcıları
```

---

## Kurulum ve Çalıştırma

Gereksinimler: **Node.js 18+** ve **npm**

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın (http://localhost:5173)
npm run dev

# Üretim derlemesi oluşturun (TypeScript kontrolü ve Vite build)
npm run build

# Üretim derlemesini önizleyin
npm run preview

# Kod denetimi (Linter)
npm run lint
```


