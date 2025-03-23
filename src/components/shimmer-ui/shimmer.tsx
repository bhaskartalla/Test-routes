import styles from './styles.module.css'
const ShimmerImage = () => {
  return (
    <>
      {Array(10)
        .fill(1)
        .map((_, ind) => (
          <div
            key={ind}
            className={styles.meme_card}
          >
            <div className={styles.image_shimmer}></div>
          </div>
        ))}
    </>
  )
}
export default ShimmerImage
