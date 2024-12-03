// Mengimpor fungsi onAuthStateChanged dari library firebase/auth
import { onAuthStateChanged } from "firebase/auth";

// Mengimpor createContext, useEffect, dan useState dari React
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // Mengimpor objek 'auth' dari konfigurasi Firebase
import Loading from "../components/Loading"; // Mengimpor komponen Loading untuk ditampilkan selama proses autentikasi

// Membuat konteks autentikasi menggunakan createContext
export const AuthContext = createContext();

// Mendefinisikan komponen AuthProvider untuk menyediakan konteks autentikasi ke komponen anak
const AuthProvider = ({ children }) => {
  
  // State 'user' menyimpan informasi pengguna yang sudah login atau null jika tidak ada pengguna
  const [user, setUser] = useState(null);

  // State 'loading' menunjukkan apakah autentikasi sedang diproses
  const [loading, setLoading] = useState(true);

  // useEffect digunakan untuk memantau status autentikasi pengguna saat komponen di-render pertama kali
  useEffect(() => {

    // Memantau perubahan autentikasi pengguna menggunakan onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      // Meng-update state user dengan data pengguna yang terautentikasi atau null jika tidak ada
      setUser(user);

      // Mengubah state loading menjadi false setelah status autentikasi ditentukan
      setLoading(false);
    });

    // Membersihkan listener onAuthStateChanged saat komponen di-unmount
    return () => unsubscribe();

  }, []); // Array dependensi kosong memastikan efek hanya dijalankan sekali saat komponen di-render pertama kali

  // Menampilkan komponen Loading jika autentikasi masih diproses
  if (loading) {
    return <Loading />;
  }

  // Mengembalikan komponen AuthContext.Provider yang membungkus komponen anak
  // Semua komponen anak dalam AuthProvider dapat mengakses AuthContext
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Menandai AuthProvider sebagai komponen default yang diekspor dari file ini
export default AuthProvider;
