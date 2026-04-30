import { Facebook, Twitter, Linkedin } from "lucide-react"
export function Footer() {
  return (
    <footer className="border-t bg-background" dir="rtl">
      <div className="container px-4 py-12 md:px-6 md:py-16 mx-auto">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">عن الأداة</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              أداة متقدمة تعتمد على الذكاء الاصطناعي لتقدير مخاطر الإصابة بأمراض القلب وتقديم نصائح وقائية لحياة صحية أفضل 🩺❤️
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href="/survey" className="hover:text-blue-500 hover:underline">
                  ابدأ فحص القلب
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">تواصل معانا</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href="chameleon-nu.verce.app" className="hover:text-blue-500 hover:underline">
                  Chameleon FCDS
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">تابعنا</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 dark:border-zinc-800 pt-8 text-center sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Levi Ackerman. كل الحقوق محفوظة.
          </p>
          <div className="mt-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <a href="#" className="hover:text-blue-500">
              سياسة الخصوصية
            </a>
            <a href="#" className="hover:text-blue-500">
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
