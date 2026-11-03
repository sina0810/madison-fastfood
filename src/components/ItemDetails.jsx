import { useEffect, useRef } from 'react'

// Pop-up window with the details of one dish. Closes with the X button,
// the Esc key, or a click on the dimmed area outside the box.
export default function ItemDetails({ item, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (item) dialogRef.current.showModal()
  }, [item])

  if (!item) return null

  // Ask the object for its list: a Meal adds the drink and side by itself.
  const includes = item.getIncludes()

  function closeOnBackdropClick(event) {
    // The dialog element itself is only "hit" when clicking outside the inner box.
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog ref={dialogRef} className="item-dialog" aria-labelledby="item-dialog-title" onClose={onClose} onClick={closeOnBackdropClick}>
      <div className="item-dialog-box">
        <div className="item-dialog-top">
          <h2 id="item-dialog-title">{item.name}</h2>
          <button className="item-dialog-close" aria-label="Close" onClick={() => dialogRef.current.close()}>
            ✕
          </button>
        </div>
        <p className="item-dialog-price">{item.formattedPrice()}</p>
        {item.description && <p className="item-dialog-description">{item.description}</p>}

        {includes.length > 0 && (
          <>
            <h3 className="item-dialog-subtitle">What's included</h3>
            <ul className="item-dialog-list">
              {includes.map((part) => (
                <li key={part}>{part}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </dialog>
  )
}
