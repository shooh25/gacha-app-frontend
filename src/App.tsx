import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { execItem } from "./api/item";
import { ItemType } from "./types/item";
import Modal from "./Modal";
import styles from "./styles/app.module.scss";

function App() {
  const [items, setItems] = useState<ItemType[]>([]); // ガチャに入ってるアイテム
  const [foundItem, setFoundItem] = useState<ItemType | null>(null); // 出てきたアイテム
  const [isModalOpen, setIsModalOpen] = useToggle(false); // モーダルを開閉
  const [isLoading, setIsLoading] = useToggle(false); // モーダルのロード画面

  const handleExecItem = async () => {
    const response = await execItem();

    if (response.status === 200) {
      setItems(response.data);
    }
  };

  useEffect(() => {
    handleExecItem();
  }, []);

  const pullGacha = () => {
    const idx = Math.floor(Math.random() * items.length);
    setFoundItem(items[idx]);

    // ロード画面を数秒間表示
    setIsLoading(true);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // モーダルを閉じる
  const handleButtonClick = () => {
    setIsModalOpen(false);
    setFoundItem(null);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.contents}>
          <div className={styles.heading}>
            <h1>CPUガチャ</h1>
            <p>レア度 : １〜５</p>
          </div>
          {items.length !== 0 ? (
            <button onClick={pullGacha}>ガチャを回す</button>
          ) : null}
        </div>

        {isModalOpen && foundItem ? (
          <>
            <div className={styles.overlay}></div>
            <Modal
              item={foundItem}
              onButtonClick={handleButtonClick}
              isLoading={isLoading}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;


// テストコミット