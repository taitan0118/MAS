# Cách phát hành MAS để người ta tải về cài

Bộ này là dự án đã sẵn sàng. GitHub sẽ tự build file cài cho Windows (.exe), Mac (.dmg), Android (.apk) và iPhone (.ipa chưa ký) rồi đăng lên một trang tải về công khai. Làm một lần, các bản sau chỉ cần đẩy tag mới.

## Làm một lần (khoảng 15 phút)
1. **Tạo kho riêng tư `MAS`** trên GitHub (Private). Chứa mã nguồn, không ai ngoài đại ca thấy.
2. **Tạo kho công khai `MAS-tai-ve`** (Public). Chỉ chứa trang tải về. Bỏ file `README-tai-ve.md` vào kho này, đổi tên thành `README.md`.
3. **Tạo token**: GitHub, Settings, Developer settings, Personal access tokens, Fine-grained tokens. Chỉ chọn kho `MAS-tai-ve`, quyền **Contents: Read and write**.
4. Vào kho `MAS`, Settings, Secrets and variables, Actions, tạo secret tên **`TAI_VE_TOKEN`** với giá trị là token vừa tạo.
5. Đẩy toàn bộ thư mục này (trừ 2 file README, HUONG-DAN) lên kho `MAS`.
5b. Vào kho công khai `MAS-tai-ve`, Settings, Pages, chọn nhánh `main` để bật trang web. Đường dẫn sẽ là `https://taitan0118.github.io/MAS-tai-ve/` (đổi theo tên tài khoản của đại ca).
6. Nếu đại ca đặt tên kho công khai khác `taitan0118/MAS-tai-ve` thì sửa dòng `REL_REPO` trong `.github/workflows/build.yml`.

## Mỗi lần ra bản mới
```
git tag v1.0.0
git push origin v1.0.0
```
Sau khi build xong, GitHub tự đưa lên kho công khai **trang tải về** (`index.html`, nhận ra máy iPhone, Android, Windows, Mac và hiện đúng nút) cùng **bản web của app** (thư mục `app`). Đại ca chỉ cần gửi cho khách **một đường dẫn trang tải về** đó.
Vào tab **Actions** xem tiến trình (khoảng 10 đến 20 phút). Xong thì kho `MAS-tai-ve` có bản mới ở mục **Releases**, đại ca gửi đường dẫn đó cho khách tải.
Nếu không đẩy được tag: tab Actions, chọn "Build bo cai MAS", bấm **Run workflow**, nhập số phiên bản mới (ví dụ `v1.0.2`, không được trùng bản đã có) rồi chạy. Chạy tay cũng tự đăng Releases và trang tải về.

## Cập nhật nội dung app
Sửa `app/index.html` (bản mới của MAS), tăng `version` trong `package.json`, rồi đẩy tag mới.

## Điều cần biết (nói thật)
- **iPhone, iPad: cài thẳng từ web**, đúng ý đại ca: khách mở trang tải về bằng Safari, làm theo 4 bước hiện sẵn trên trang (Chia sẻ, Thêm vào MH chính). Không có file .ipa để tải vì ** Apple chỉ cho cài app ngoài web qua App Store hoặc TestFlight, cần tài khoản nhà phát triển Apple (khoảng 99 USD mỗi năm) và máy Mac. Trong lúc chưa có, iPhone dùng bản web cài từ Safari (đã có hướng dẫn).
- **Windows và Mac**: file cài chưa ký số nên hiện cảnh báo khi cài (đã ghi cách vượt trong README). Muốn hết cảnh báo cần mua chứng chỉ ký (Windows) và tài khoản Apple Developer (Mac). Bản Mac build riêng cho chip Apple (arm64) và chip Intel (x64).
- **Android**: là file .apk ký thử, người dùng phải cho phép cài từ nguồn ngoài. Bản này **chưa hỗ trợ in bill** (WebView của Android không có in). Lưu file Excel và sao lưu đi qua bảng chia sẻ của máy. Máy POS Android cần in bill thì cài bản web bằng Chrome.
- **Chưa chạy thử**: quy trình build này em chưa chạy được ở đây (máy em bị chặn tải gói và không có Mac, Android SDK). Lần chạy đầu có thể báo lỗi nhỏ, đại ca gửi nhật ký lỗi cho em sửa.
- Mã nguồn kho riêng tư an toàn. Kho công khai chỉ có file cài. Người tải về vẫn có thể giải nén file cài nên giấy phép (file LICENSE đi kèm) mới là căn cứ pháp lý, không chặn được sao chép.

## iPhone cài file, không qua web (đã thêm)
- CI build ra `MAS-iPhone.ipa` **chưa ký**. Khách cài bằng **Sideloadly** hoặc **AltStore** với Apple ID miễn phí (các bước nằm trên trang tải về).
- **Giới hạn của Apple, không né được nếu không trả phí:** app cài kiểu này hết hạn sau **7 ngày**, phải ký lại; mỗi Apple ID miễn phí tối đa 3 app; cần máy tính. AltStore tự làm mới được nếu máy tính và iPhone cùng Wi-Fi và máy tính đang mở AltServer.
- Muốn cài thẳng không hết hạn: cần tài khoản Apple Developer (khoảng 99 USD mỗi năm), khi đó đưa app lên TestFlight hoặc App Store. Em làm được phần build khi đại ca có tài khoản.
- Phần iOS em chưa chạy thử (không có Mac). Lần đầu CI có thể lỗi, gửi nhật ký cho em sửa. Bản iPhone cũng chưa in bill được, giống Android.

## Bản phát hành đủ bộ (giống MAO)
Khi đẩy tag, bản phát hành tự có: `MAS-Windows.exe`, `MAS-Mac-arm64.dmg`, `MAS-Mac-x64.dmg`, `MAS-Android.apk`, `MAS-iPhone.ipa`, 6 PDF `Huong-dan-<Windows|Mac|May-POS|Android|iPad|iPhone>.pdf` (nguồn trong thư mục `huong-dan/`), `Gioi-thieu-MAS.pdf`, `Huong-dan-Day-du.pdf`, `LICENSE.txt` và bảng "Chọn file theo máy của cửa hàng". Chưa chạy thử trên GitHub.
