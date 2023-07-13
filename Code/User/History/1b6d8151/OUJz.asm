ORG 0x7c00
BITS 16

; http://www.ctyme.com/intr/rb-0106.htm
start: ; Print character 'A'
    mov ah, 0eh
    mov al, 'A'
    mov bx, 0
    int 0x10 ; calling BIOS routine

    jmp $

message: db 'Hello Wordl!', 0
times 510-($ - $$) db 0 ; fill at least 510 bytes of data
dw 0xAA55 