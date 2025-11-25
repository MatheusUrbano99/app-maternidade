export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen pb-24">
      {children}
    </main>
  );
}
