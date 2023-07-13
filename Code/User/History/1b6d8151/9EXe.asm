ORG 0x7c00
BITS 16

CODE_SEG equ gdt_code - gdt_start
DATA_SEG equ gdt_data - gdt_start

_start:
    jmp short start
    nop

 times 33 db 0

start:  
    jmp 0:step2

step2:
    cli ; Clear Interrupts

    mov ax, 0x00
    mov ds, ax ; Data Segment
    mov es, ax ; Extra Segment
    mov ss, ax
    mov sp, 0x7c00

    sti ; Enable Interrupts

.load_protected:
    cli
    lgdt[gdt_descriptor]
    mov eax, cr0
    mov eax, 0x1
    mov cr0, eax

    jmp CODE_SEG:load32


; GDT
gdt_start:
gdt_null:
    dd 0x0
    dd 0x0

; offset 0x8
gdt_code:        ; CS should point to this
    dw 0xffff    ; segment limit first 0-15 bits
    dw 0         ; base first 0-15 bits
    db 0         ; base 16-23 bits
    db 0x9a      ; Access byte
    db 11001111b ; High 4 bit flags and the low 4 bit flags
    db 0         ; base 24-31 bits 

; offset 0x10
gdt_data:        ; DS, SS, ES,  FS, GS
    dw 0xffff    
    dw 0         
    db 0         
    db 0x92      
    db 11001111b 
    db 0         

gdt_end:

gdt_descriptor:
    dw gdt_end - gdt_start-1
    dd gdt_start

[BITS 32]
load32:
    jmp $

times 510-($ - $$) db 0
dw 0xAA55 

buffer: