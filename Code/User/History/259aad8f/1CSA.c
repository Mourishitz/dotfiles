#include "kernel.h"
#include <stddef.h>
#include <stdint.h>

uint16_t* video_mem = 0;

uint16_t terminal_make_char(char c, char colour)
{
    return (colour << 8) | c;
}

void terminal_initialize()
{
    video_mem = (uint16_t*)(0xB8000); // creating a pointer to this absolute address at memory

    for (int y = 0; y < VGA_HEIGHT; y++)
    {
        for (int x = 0; x < VGA_WIDTH; x++)
        {
            video_mem[(y * VGA_WIDTH) + x] = terminal_make_char(' ', 0);
        }
    }
}

size_t strlen(const char* str)
{
    size_t len = 0;
    while(str[len])
    {
        len++;
    }

    return len;
}


void kernel_main()
{
    terminal_initialize();
    video_mem[0] = terminal_make_char('B', 15);
}