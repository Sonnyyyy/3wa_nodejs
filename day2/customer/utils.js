exports.toTTC = function(priceHT, taxe = 15) {
  return priceHT * (1 + (taxe / 100));
}