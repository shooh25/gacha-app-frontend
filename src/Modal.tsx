import { useState } from "react";
import { useToggle } from "react-use";
import styles from "./styles/modal.module.scss";
import { ItemType } from "./types/item";

interface Props {
  item: ItemType;
  isLoading: boolean;
  onButtonClick: () => void;
}

const Modal = (props: Props) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          {props.isLoading ? (
            <div className={styles.contents}>
              <p className={styles.loadingText}>
                ガチャガチャを引いています。。
              </p>
            </div>
          ) : (
            <div className={styles.contents}>
              <div className={styles.texts}>
                <p>結果</p>
                <h2>{props.item.name}</h2>
                <h3>レア度 : {props.item.rarity}</h3>
              </div>
              <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={props.onButtonClick}>
                  閉じる
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
