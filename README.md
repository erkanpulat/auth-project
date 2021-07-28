# Node.js - Express.js - Handlebars.js - Passport.js - MongoDB MVC Auth Project 

## Proje Görselleri Ve Açıklaması

-  ### Kullanılan Paketler
    ```
    +-- bcrypt@5.0.1
    +-- connect-flash@0.1.1
    +-- connect-mongodb-session@2.4.1
    +-- dotenv@10.0.0
    +-- express@4.17.1
    +-- express-handlebars@5.3.2
    +-- express-session@1.17.2
    +-- express-validator@6.12.0
    +-- handlebars-helpers@0.10.0
    +-- jsonwebtoken@8.5.1
    +-- method-override@3.0.0
    +-- moment@2.29.1
    +-- mongoose@5.13.2
    +-- multer@1.4.2
    +-- nodemailer@6.6.3
    +-- nodemailer-express-handlebars@4.0.0
    +-- passport@0.4.1
    `-- passport-local@1.0.0
    ```
 
- ### **Projede SB Admin 2 template kullanılmış ve revize edilmiştir.**
 
-  ### Login Sayfası
    -  Giriş işlemi session bazlı yapılmakta ve passport.js kullanılmaktadır. Validasyon veya login hataları ekrana basılmaktadır.
    
    ![login](https://user-images.githubusercontent.com/65369334/127347283-1992f751-6bb3-4449-be35-cbabe6eed7c2.png)
    
-  ### Register Sayfası
    -  Validasyon hataları ekrana basılmaktadır. 
    
    ![register](https://user-images.githubusercontent.com/65369334/127347415-e50ee596-fb31-401c-a118-c2bcbf579754.png)
    
    -  Hata alınmadığı zaman kullanıcı login sayfasına yönlendirilmekte ve mail adresine onay mesajının gittiği bildirilmektedir.
    
    ![email onay mesajı](https://user-images.githubusercontent.com/65369334/127348135-4d0a27f3-8729-41e3-8a7d-8e00fa5460e7.png)
    
    -  Mail onaylanmadan sisteme giriş yapılmak istenildiği takdirde hata gösterilmektedir.

      ![email aktif hata mesajı](https://user-images.githubusercontent.com/65369334/127348295-f6705d82-1703-42fb-a956-1cc5f43026bf.png)

-  ### Onay Emaili
    -  Mail onay işleminde jwt kullanılmaktadır.
    
    ![mail](https://user-images.githubusercontent.com/65369334/127348409-0f2dba55-0910-441a-b2af-6f46140efc09.png)
    
    -  Mail onay işlemi başarılı olduğu takdirde login sayfasına yönlendirme yapılmakta ve bilgi mesajı gösterilmektedir.

    ![image](https://user-images.githubusercontent.com/65369334/127348770-65494ea0-27ee-4af4-946e-971ddc57d5a9.png)
    
    -  Onay emailinin süresi bittiğinde veya herhangi bir hata çıktığında hata mesajı gösterilmektedir.
    
    ![image](https://user-images.githubusercontent.com/65369334/127348846-60bf45af-769e-464d-9eaf-99cd80d33a98.png)
    
-  ### Admin Sayfası
   -  Admin Dashboard
   
    ![admin](https://user-images.githubusercontent.com/65369334/127349464-5cc67c05-14a9-41d1-b37a-8fa961a4746b.png)
    
   -  Kullanıcılar Tablosu

    ![tablo](https://user-images.githubusercontent.com/65369334/127349803-9c097bf0-478b-4c54-a197-fbd384ca51c2.jpg)
    
    - Profil güncelleme işlemi ve multer ile resim yükleme işlemi yapılmaktadır.
    
    ![profil](https://user-images.githubusercontent.com/65369334/127349962-0558aa36-dae1-44da-9835-018ab25f4970.png)

-  ### Kullanıcı Sayfası
   -  Ana Sayfa
   
    ![kullanici](https://user-images.githubusercontent.com/65369334/127350179-cf8a535d-24eb-49db-893b-d62c4cbf8ef7.png)
    
    - Çıkış işlemi yapıldığında session silinmektedir.

    ![cikis](https://user-images.githubusercontent.com/65369334/127350234-56327a36-09b2-4e7b-98cb-12077cc20d18.png)

-  ### Şifremi Unuttum
    - Şifremi sıfırla butonuna basıldığı zaman login sayfasına yönlendirilmekte ve bilgi mesajı gösterilmektedir. Aynı zamanda kullanıcı mailine tek seferlik sıfırlama maili jwt     ile yollanmaktadır.
    
    ![image](https://user-images.githubusercontent.com/65369334/127350775-7610f931-5cac-47c0-8bcf-e3a0eba8d3cf.png)
    
    - Herhangi bir hata çıktığında ekrana basılmaktadır. Hata çıkmadığı zaman ise şifre yenileme ekranına yönlendirme yapılmaktadır.
    
    ![image](https://user-images.githubusercontent.com/65369334/127351135-82681d0f-3e30-4723-a412-47c80a9d3cba.png)







