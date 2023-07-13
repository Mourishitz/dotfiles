#include "kernel.h"
#include <stdint.h>

void kernel_main()
{
    uint16_t* video_mem = (uint16_t*)(0xB8000); // creating a pointer to this absolute address at memory
    video_mem[0] = 'A';
    video_mem[1] = 1;
    video_mem[2] = 'C';
    video_mem[3] = 3;
}