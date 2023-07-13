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
    or eax, 0x1
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
    mov eax, 1          ; starting sector where we load from
    mov ecx, 100        ; total number sectors we will load
    mov edi, 0x0100000  ; address we are loading into (1Mb)
    call ata_lba_read
    jmp CODE_SEG:0x0100000

ata_lba_read:
    mov ebx, eax, ; Backup the LBA
    ; Send the highest 8 bits of the lba to hard disk controller
    shr eax, 24   ; (38 - 28 = 8bits)
    or eax, 0xE0  ; Select the master drive
    mov dx, 0x1F6 ; Port that expects us to wrtie the 8bits to
    out dx, al
    ; Finished sending 8bits of the lba

    ; Send total sectors to read
    mov eax, ecx
    mov dx, 0x1F2
    out dx, al

    ; Send more bits of the LBA
    mov eax, ebx ; Restoring backup of LBA
    mov dx, 0x1F3
    out dx, al

    ; Send more bits of the LBA
    mov dx, 0x1F4
    mov eax, ebx ; Restoring backup of LBA
    shr eax, 8 
    out dx, al

    ; Send upper 16 bits of LBA

    mov dx, 0x1F5
    mov eax, ebx ; Restoring backup of LBA
    shr eax, 16
    out dx, al

    mov dx, 0x1f7
    mov al, 0x20
    out dx, al

; Read all sector into memory
.next_sector:
    push ecx

; Check if we need to read
.try_again:
    mov dx, 0x1f7
    in al, dx
    test al, 8
    jz .try_again

; We need to read 256 words at a time
    mov ecx, 256
    mov dx, 0x1F0
    rep insw ; Reads a word in I/O port specified in dx into memory location specified in edi
    pop ecx  ; Basically, read 256 times the I/O ant store on the 1Mb (edi=0x0100000)
    loop .next_sector

    ret

times 510-($ - $$) db 0
dw 0xAA55 
