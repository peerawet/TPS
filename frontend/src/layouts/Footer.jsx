function Footer() {
  return (
    <footer className="bg-gray-800 bg-opacity-70 text-white py-2 mt-8 sticky bottom-0">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Peerawet Chursuk. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
