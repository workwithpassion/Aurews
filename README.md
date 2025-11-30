# INTERNATIONAL ECO AND BUS NEWS: AUREWS

## INTRODUCTION
**AUREWS** là một dự án trang web tin tức dành cho môn học IE104: Nhập môn Lập trình Web. Trang web mô phỏng một tờ báo quốc tế, tập trung vào các chủ đề về Kinh tế (Eco) và Kinh doanh (Bus), được xây dựng hoàn toàn bằng công nghệ front-end cơ bản: HTML, CSS và JavaScript thuần (Vanilla JS).

Dự án này nhấn mạnh vào việc tự xây dựng các thành phần (components) và quản lý trạng thái mà không cần sự hỗ trợ của bất kỳ framework nào.


[DEMO](https://youtu.be/g8wDAmSOrPc?si=zG3e8Uv7FiPYaYA3)

[LINK DEPLOY NETLIFY](https://mraver.github.io/Aurews/pages/)

![PREVIEW](/assets/img/screenshot.png)

## DESCRIPTION
### Các tính năng nổi bật

+ Thiết kế theo Component: Giao diện được chia thành các thành phần có thể tái sử dụng (Navbar, Footer, Card,...) giúp mã nguồn có tổ chức và dễ bảo trì.

+ Xác thực người dùng: Mô phỏng luồng đăng nhập / đăng xuất. Dữ liệu người dùng được lưu trữ tạm thời bằng localStorage của trình duyệt.

+ Tìm kiếm và Lọc:
    + Người dùng có thể tìm kiếm bài viết theo từ khóa.
    + Lọc và xem các bài viết theo từng chuyên mục (Category) khác nhau.

+ Giao diện Responsive: Trang web được thiết kế để tương thích và hiển thị tốt trên nhiều kích thước màn hình, từ máy tính để bàn đến điện thoại di động.

+ Dữ liệu tĩnh: Toàn bộ dữ liệu bài viết được quản lý trong các file JavaScript (/assets/data/), mô phỏng việc gọi dữ liệu từ API.

### Công nghệ sử dụng

+ Ngôn ngữ chính: HTML5, CSS3, JavaScript (ES6+)

+ Kiến trúc: Vanilla JS Component-Based.

+ Lưu trữ phía Client: localStorage để quản lý trạng thái đăng nhập.

+ Môi trường phát triển: Visual Studio Code, Live Server.

### Cấu trúc thư mục

Dự án được tổ chức một cách rõ ràng, tách biệt giữa các thành phần giao diện, các trang, logic và tài nguyên tĩnh.
```
Aurews/
┣ assets/              # Chứa tài nguyên tĩnh (CSS, JS, data, hình ảnh)
┃ ┣ css/               # Chứa các file CSS cho từng trang
┃ ┣ data/              # Chứa dữ liệu "giả" cho các bài báo
┃ ┣ img/               # Chứa hình ảnh
┃ ┗ js/                # Chứa các file JS xử lý logic cho từng trang
┣ components/          # Chứa các thành phần UI có thể tái sử dụng
┃ ┣ Banner/          
┃ ┣ Category/
┃ ┣ Footer/
┃ ┣ MobileMenu/
┃ ┣ Navbar/
┃ ┗ PopUpOverlay/
┣ pages/               # Chứa các file HTML của các trang
┣ LICENSE              # Giấy phép mã nguồn
┣ package.json         # Thông tin dự án và dependencies (nếu có)
┗ README.md            # Tài liệu hướng dẫn
```
## USAGE
### Hướng dẫn Cài đặt và Chạy dự án

***Bạn có thể truy cập và dùng thử trang web thông qua các link deploy bên trên hoặc tham khảo cách thủ công dưới đây***

Để chạy dự án này trên máy tính của bạn, hãy làm theo các bước sau:

#### Yêu cầu:

* Git được cài đặt trên máy.

* Trình soạn thảo code, ví dụ: Visual Studio Code.

**Bước 1: Tải mã nguồn về máy (Clone repository)**

Mở Terminal (hoặc Git Bash trên Windows) và chạy lệnh sau:

```bash
git clone https://github.com/MRaver/Aurews.git
```
**Bước 2: Di chuyển vào thư mục dự án**
```bash
cd Aurews
```
**Bước 3: Chạy dự án**

Dự án này là một trang web tĩnh, bạn có thể chạy nó theo một trong hai cách sau:

#### Cách 1: Dùng Extension "Live Server" (Khuyến khích)

Đây là cách tốt nhất để trải nghiệm dự án vì nó tạo ra một môi trường máy chủ cục bộ, tránh được các lỗi liên quan đến CORS và tự động cập nhật khi bạn thay đổi mã nguồn.

* Mở thư mục dự án Aurews bằng Visual Studio Code.

* Nếu bạn chưa có, hãy cài đặt extension Live Server từ Marketplace.

* Trong cây thư mục của VS Code, tìm đến file pages/index.html.

* Nhấn chuột phải vào file index.html và chọn "Open with Live Server".

* Trình duyệt sẽ tự động mở trang web và bạn có thể bắt đầu sử dụng.

#### Cách 2: Mở file HTML trực tiếp

* Trong thư mục dự án trên máy tính của bạn, đi vào thư mục pages.

* Nhấn đúp chuột vào file index.html.

* File sẽ được mở trực tiếp trên trình duyệt của bạn.

## Contributors

* **Đỗ Nhất Phong**

* **Trần Quang Phát**

* **Nguyễn Xuân Đình Lực**

* **Huỳnh Đào Quốc Trọng**


*GitHub: MRaver*

*Dự án được thực hiện trong khuôn khổ môn học IE104.*

## License

[MIT](https://choosealicense.com/licenses/mit/)
