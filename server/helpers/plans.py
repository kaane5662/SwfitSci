import os

plans = {
   "Pro": "" if os.environ.get("PRODUCTION") == True else "price_1PJQ3ZBNnyjrtwsjTdRejVGz",
   # other plans
}

print(plans["Pro"])