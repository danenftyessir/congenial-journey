const Footer = () => (
  <footer className="px-5 lg:px-10 py-12 text-gray-600 text-xs max-w-screen-2xl mx-auto">
    <div className="flex flex-col gap-4">
      <p className="text-gray-500">Dibuat dengan ❤️ untuk kita.</p>
      <p>
        Semua kenangan, foto, dan video dalam platform ini bersifat pribadi dan
        hanya dapat diakses dari perangkat ini.
      </p>
      <p className="text-gray-700">© {new Date().getFullYear()} Netflix for Memories — Our Story.</p>
    </div>
  </footer>
);

export default Footer;
