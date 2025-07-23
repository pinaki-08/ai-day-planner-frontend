// IMPORTANT: Replace <YOUR_LOCAL_IP> with your computer's local IP address (e.g., 192.168.1.5)
export async function analyzeProduct(url) {
  const response = await fetch("http://10.0.0.93:3000/analyze-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  return response.json();
}
