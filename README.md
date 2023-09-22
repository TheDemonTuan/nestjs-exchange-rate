# Bài tập nhỏ về lấy tỷ giá ngoại tệ của môn Phân Tích Thiết Kế Hệ Thống
## Theo 2 cách có api và lấy trực tiếp từ html

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

https://exchange-rate.thedemontuan.com/

**Công nghệ:** `Javascript` `Typescript` `NodeJS` `Framework NestJS` `EJS Templates` `Mysql`

## Dữ liệu đươc lấy từ các nguồn của vietcombank

`https://www.vietcombank.com.vn/KHCN/Cong-cu-tien-ich/Ty-gia`
`https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx`

## Cơ chế cập nhật dữ liệu
- Tự động cập nhật mỗi 10 phút dựa theo lần chạy đầu tiên trên server.
- Cập nhật lại khi có request vào trang web nếu thời gian cập nhật lần cuối tính đến thời điểm hiện tại quá 10 phút

## Thư viện 
- Sử dụng thư viện xml2js để thực hiện parse lại dữ liệu get ở api sang json để dễ dàng xử lý.
- Sử dụng thư viện cheerio để lấy các dữ liệu của các element của một source code html cách nhanh và dễ dàng xử lý.
- Prisma ORM để dễ dàng thao tác đến các cơ sở dữ liệu.
- Axios để gửi request và nhận response từ các nguồn.
- EJS Templates dùng để render HTML ở phía server 

## Cách hoạt động
- Các logic như chỉ cập nhật lại khi dữ liệu đã cũ (quá 10p)
- Tiến hành dùng axios gọi lên các nguồn dữ liệu tiến hành dùng các thư viện để xử lý các dữ liệu.
- Thêm lần lượt các dữ liệu đã được xử lý vào database.
- Lưu lại thời gian cập nhật dữ liệu hiện tại vào database.
- Mỗi lần request thì controller lấy dữ liệu từ database và trả về cho Views để in ra.
