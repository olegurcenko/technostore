import React from 'react';
import copy from './images/copy.png'
import styles from './css/userCard.module.css'

export const CopyButton = ({ textToCopy }) => {
  const copyToClipboard = () => {
    // Use the Clipboard API to write the text to the clipboard
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard!');
        // Optionally, you can provide user feedback, update state, etc.
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard:', err);
        // Handle errors or provide user feedback
      });
  };

  return (
    <section className={styles.copyButton}>
      <button onClick={copyToClipboard}>
		<p>{textToCopy}</p>
		<img src={copy} alt="" />
		</button>
    </section>
  );
};

