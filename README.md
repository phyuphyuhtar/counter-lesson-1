# Understanding `App.jsx`: Resetting Negative Counts in React

## 1 | State Setup

```jsx
const [count, setCount] = useState(0);
````

* **`count`** – the current number shown in the UI
* **`setCount`** – the updater that schedules a re‑render every time it’s called

---

## 2 | Increment / Decrement Buttons

```jsx
<button onClick={() => setCount(c => c + 1)}>+</button>
<button onClick={() => setCount(c => c - 1)}>-</button>
```

* Uses the functional form `setCount(c => …)` so each click works with the freshest value.
* Every click causes a new render where anything that reads `count` (like `checkNumber()`) runs again.

---

## 3 | `checkNumber()` — the Gatekeeper

```jsx
function checkNumber() {
  if (count >= 0) {
    return count;        // ✅ valid; just show it
  } else {
    setCount(() => 0);   // 🛑 force count back to 0
    // React schedules another render; this return value is discarded
  }
}
```

### What happens when `count` is negative?

1. **Render pass ①**

   * `count` = ‑1 → `if` fails → `else` runs.
2. **`setCount(() => 0)`**

   * Marks component dirty; queues **render pass ②**.
3. **Render pass ②**

   * `count` has now been reset to **0**.
   * `count >= 0` is true → `0` is returned and displayed.

---

## 4 | Why Calling `setState` During Render Is Risky

* Creates an extra render (performance hit).
* Can cause infinite loops if not guarded.
* Better: clamp the value **before** saving it.

---

## 5 | Cleaner Pattern (No State Updates in Render)

```jsx
function clamp(n) {
  return n < 0 ? 0 : n;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>count is {count}</h3>
      <button onClick={() => setCount(c => clamp(c + 1))}>+</button>
      <button onClick={() => setCount(c => clamp(c - 1))}>-</button>
    </>
  );
}
```

*The UI never paints a negative number, and all state changes happen inside event handlers (React best practice).*

