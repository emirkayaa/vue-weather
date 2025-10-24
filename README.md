# Hava Durumu Uygulaması

Vue 3 ile geliştirilmiş, kullanıcı dostu ve modern bir hava durumu uygulaması. Kullanıcılar şehir arayarak gerçek zamanlı hava durumu bilgilerine erişebilir ve arama geçmişlerini takip edebilirler.

## Proje Özellikleri

- **Kullanıcı Girişi**: Kullanıcı kimlik doğrulama sistemi
- **Şehir Arama**: Şehir ismine göre hava durumu arama
- **Dinamik Arka Plan**: Hava durumuna göre değişen arka plan tasarımı (weather_code bazlı)
- **Profil Sayfası**: Kullanıcı bilgileri ve arama geçmişi
- **Responsive Tasarım**: Tüm cihazlarda uyumlu arayüz
- **Modern UI**: Tailwind CSS ile şık ve modern tasarım

## Kullanılan Teknolojiler

- **Vue 3**: Progressive JavaScript framework
- **Pinia**: Vue için state management
- **Axios**: HTTP istekleri için
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Modern ve şık icon seti
- **Vue Toast**: Toast mesajları için


## Kurulum

1. Projeyi klonlayın:
```bash
git clone <https://github.com/emirkayaa/vue-weather.git>
cd vue-weather
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

##  Kullanım

### 1. Giriş Yapma
- Uygulama açıldığında giriş sayfası karşınıza çıkar
- Kullanıcı bilgilerinizle giriş yapın

### 2. Şehir Arama
- Ana sayfada (Home) bulunan arama kutusuna şehir ismi yazın
- Çıkan önerilerden istediğiniz şehri seçin
- Seçilen şehrin hava durumu bilgileri anında görüntülenir

### 3. Hava Durumu Görüntüleme
- Sayfa arka planı hava durumuna göre (weather_code) otomatik değişir
- Görsel olarak hava durumunu daha kolay anlayabilirsiniz

### 4. Profil Sayfası
  - Profil sayfasından kullanıcı bilgilerinizi görüntüleyin:
  - Kullanıcı adı
  - E-posta adresi
  - Daha önce aradığınız şehirler ve hava durumu verileri


