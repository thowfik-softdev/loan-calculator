export default function useEMICalculator(P, R, N) {
  const r = R / 12 / 100,
    n = N;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
