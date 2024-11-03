import Header from '@/app/_components/Header';

import CoffeeShop from './pages/menu/page';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <CoffeeShop />
      </main>
    </div>
  );
}
