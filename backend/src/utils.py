def validate_luhn(imei: str) -> bool:
    """
    Valida uma string de IMEI utilizando o Algoritmo de Luhn.
    O IMEI padrão possui exatamente 15 dígitos numéricos.
    """
    if not imei.isdigit() or len(imei) != 15:
        return False

    digits = [int(c) for c in imei]
    checksum = 0
    
    for i, digit in enumerate(reversed(digits)):
        if i % 2 == 1:
            doubled = digit * 2
            checksum += sum(divmod(doubled, 10))
        else:
            checksum += digit
            
    return checksum % 10 == 0