
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
        <p className="font-semibold text-blue-950">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-base-content/70">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}