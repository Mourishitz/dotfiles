ORG 0
BITS 16
_start:
    jmp short start
    nop

 times 33 db 0

start:  
    jmp 0x7c0:step2



step2:
    cli ; Clear Interrupts

    mov ax, 0x7c0
    mov ds, ax ; Data Segment
    mov es, ax ; Extra Segment
    mov ss, ax
    mov sp, 0x7c00

    sti ; Enable Interrupts

    mov ah, 2 ; Read sector
    mov al, 1 ; One sector to read
    mov ch, 0 ; Cylinder low eight bits
    mov cl, 2 ; Read sector two
    mov dh, 0 ; Head number

    jmp $

print:
    mov bx, 0

.loop:
    lodsb
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


times 510-($ - $$) db 0
dw 0xAA55 