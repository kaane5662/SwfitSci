from  generator import Generator


ans = Generator.generate_results()
# print(ans)
with open("paper.txt","w") as file:
    file.write(ans)