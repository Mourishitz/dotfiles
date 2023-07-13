#include "kernel.h"
#include <stdint.h>

void kernel_main()
{
    uint16_t* video_mem = (uint16_t*)(0xB8000); // creating a pointer to this absolute address at memory
    video_mem[0] = '0x0341';
}