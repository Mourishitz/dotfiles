ORG 0x7c00
BITS 16

; http://www.ctyme.com/intr/rb-0106.htm
start:
    mov si, message

    jmp $

print:
    mov bx, 0

.loop:
    cmp al, 0
    je .done
    call print_char
    jmp .loop

.done:
    ret

print_char:
    mov ah, 0eh
    int 0x10
    ret

message: db 'Hello World!', 0

times 510-($ - $$) db 0
dw 0xAA55 