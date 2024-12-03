// Mengimpor fungsi onAuthStateChanged dari library firebase/auth
// Fungsi ini digunakan untuk memantau perubahan status autentikasi pengguna
import { onAuthStateChanged } from "firebase/auth";

// Mengimpor createContext, useEffect, dan useState dari React
// - createContext digunakan untuk membuat konteks yang akan menyimpan data autentikasi
// - useEffect digunakan untuk menjalankan efek samping (side-effect) saat komponen di-render
// - useState digunakan untuk mendeklarasikan variabel state di dalam komponen
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import Loading from "../components/Loading";

// Membuat konteks autentikasi menggunakan createContext dan menyimpannya dalam AuthContext
// Konteks ini akan digunakan untuk menyediakan data autentikasi ke komponen anak
export const AuthContext = createContext();

// Mendefinisikan komponen AuthProvider yang akan menyediakan konteks autentikasi
// Komponen ini menerima "children" sebagai props, yang berisi komponen anak yang memerlukan akses ke konteks
const AuthProvider = ({ children }) => {
  
  // Mendeklarasikan state user yang akan menyimpan informasi pengguna saat ini
  // Nilai awalnya adalah null, menandakan bahwa tidak ada pengguna yang terautentikasi
  const [user, setUser] = useState(null);

  // Mendeklarasikan state loading yang menunjukkan status proses autentikasi
  // Nilai awalnya adalah true, menandakan proses autentikasi sedang berjalan
  const [loading, setLoading] = useState(true);

  // Menggunakan useEffect untuk menjalankan kode saat komponen pertama kali di-render
  // Efek samping ini hanya dijalankan sekali karena array dependensi ([]) kosong
  useEffect(() => {

    // Memanggil fungsi onAuthStateChanged untuk memantau perubahan status autentikasi
    // Jika status autentikasi berubah, callback function di dalamnya akan dipanggil
    onAuthStateChanged(auth, (user) => {

      // Meng-update state user dengan data pengguna yang terautentikasi (atau null jika logout)
      setUser(user);

      // Mengubah state loading menjadi false setelah status autentikasi diketahui
      // Ini menandakan bahwa proses autentikasi selesai
      setLoading(false);
    });

  }, []); // Array dependensi kosong untuk memastikan efek hanya dijalankan sekali saat komponen di-render pertama kali

  // Jika state loading masih true, maka tampilkan "Loading"
  // Ini mencegah komponen anak di-render sebelum status autentikasi selesai ditentukan
  if (loading) {
    return <Loading/>
  }

  // Mengembalikan komponen AuthContext.Provider yang membungkus komponen anak (children)
  // Dengan cara ini, semua komponen anak yang berada di dalam AuthProvider dapat mengakses AuthContext
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Menandai AuthProvider sebagai komponen default yang diekspor dari file ini
export default AuthProvider;

//===================RANGKUMAN==================
// AuthContext diciptakan untuk menyediakan informasi autentikasi ke komponen anak.
// AuthProvider bertanggung jawab untuk memantau status autentikasi pengguna dengan onAuthStateChanged.
// useEffect memastikan kode yang memantau perubahan autentikasi hanya dijalankan sekali saat komponen di-render pertama kali.
// Loading state digunakan untuk mencegah tampilan komponen anak sebelum autentikasi selesai.B