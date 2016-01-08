var game = []
game["attention"] = ["dualfocus", "dualfocuspro", "blink", "blinkpro"];
game["memory"] = ["tracktheroute", "memorymatrix", "memorymatrixpro"];
game["visualperception"] = ["dancingballs", "shapes"];
game["flexibility"] = ["matchit", "matchitpro", "reversal", "reversalpro"];
game["problemsolving"] = ["moneygame", "solveit", "aftermath"];
game["processingspeed"] = ["speedshop","spotit","spoitpro","brainprofile"];

exports.getGames = function(cat) {
  return game[cat];
}






















