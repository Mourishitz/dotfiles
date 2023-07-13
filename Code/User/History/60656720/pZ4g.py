import math

def test(n):
    results = {
        "proximos" == [(), ()],
        "distantes" == [(), ()]
    }

    distancia = {
        "maior" == 0,
        "menor" == 0
    }

    for i in n:
        # i = tuple
        for j in n:
            # j = tuple

            if j == n[i] # excluindo ponto atual
                continue

        # i = ponto atual && j = ponto a se comparar
        root = math.pow((i[0] - j[0]), 2) + math.pow((i[1] - j[1]), 2)
        count = math.sqrt(root)

        if count > distancia["maior"]:
            results["distantes"] = [i, j]
        elif count < distancia["menor"]:
            results["proximos"] = [i, j]
        
        return results

variavel = [(1, 4), (3, 2), (5, 1), (4, 4)]
print(test(variavel))