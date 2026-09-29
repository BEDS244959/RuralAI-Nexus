export function calculateCropFinance({
  area,
  estimatedCost,
  lowYield,
  highYield,
  pricePerKg,
  budget,
}) {
  const lowRevenue = lowYield * pricePerKg;
  const highRevenue = highYield * pricePerKg;

  const lowNet = lowRevenue - estimatedCost;
  const highNet = highRevenue - estimatedCost;

  const fundingGap = Math.max(0, estimatedCost - budget);

  const breakEvenPrice =
    lowYield > 0 ? estimatedCost / lowYield : 0;

  const roiLow =
    estimatedCost > 0
      ? (lowNet / estimatedCost) * 100
      : 0;

  const roiHigh =
    estimatedCost > 0
      ? (highNet / estimatedCost) * 100
      : 0;

  return {
    area,
    estimatedCost,
    lowYield,
    highYield,
    pricePerKg,
    lowRevenue,
    highRevenue,
    lowNet,
    highNet,
    fundingGap,
    breakEvenPrice,
    roiLow,
    roiHigh,
  };
}