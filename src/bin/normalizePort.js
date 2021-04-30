export default function normalizePort(port) {
  const PORT = Number.parseInt(port, 10);

  if (Number.isNaN(PORT)) {
    return port;
  }

  if (PORT >= 0) {
    return PORT;
  }

  return false;
}
