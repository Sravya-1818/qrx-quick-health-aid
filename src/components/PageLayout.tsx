// src/components/PageLayout.tsx
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-100 py-10 px-4">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-xl">
      {children}
    </div>
  </div>
);

export default PageLayout;
