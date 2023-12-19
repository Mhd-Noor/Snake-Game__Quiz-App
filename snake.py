import pygame, sys, random
from pygame.math import Vector2

class SNAKE():
    def __init__(self):
        self.body = [Vector2(5,10), Vector2(4,10), Vector2(3,10)]
        self.direction = Vector2(1,0)
        self.new_block = False

    def draw_snake(self):
        for block in self.body:
            block_rect = pygame.Rect(int(block.x * cell_size), int(block.y * cell_size), cell_size, cell_size)
            pygame.draw.rect(screen,(0,77,250),block_rect)

    def move_snake(self):
        if self.new_block == True:
            body_copy = self.body[:]
            body_copy.insert(0,body_copy[0] + self.direction)
            self.body = body_copy[:]
            self.new_block = False
        else:
            body_copy = self.body[:-1]
            body_copy.insert(0,body_copy[0] + self.direction)
            self.body = body_copy[:]

    def add_block(self):
        self.new_block = True


class FRUIT:
    def __init__(self):
        self.x = random.randint(0, cell_num - 1) # randomly chooses the x vector
        self.y = random.randint(0, cell_num - 1) # randomly chooses the y vector 
        self.pos = Vector2(self.x, self.y) # Putting the coordinates as a vector
        
    def draw_fruit(self):
        fruit_rect = pygame.Rect(int(self.pos.x * cell_size), int(self.pos.y * cell_size), cell_size, cell_size ) # This would be our rectangle for the fruit
        screen.blit(pygame.transform.scale(apple, (cell_size, cell_size)), fruit_rect)
        #pygame.draw.rect(screen, (126,166,114), fruit_rect) # to draw fruit we neet three parameters the surface the colr and rectangle

    def randomize(self):
        self.x = random.randint(0, cell_num - 1) 
        self.y = random.randint(0, cell_num - 1) 
        self.pos = Vector2(self.x, self.y)

class MAIN:
    def __init__(self):
        self.snake = SNAKE()
        self.fruit = FRUIT()

    def update(self):
        self.snake.move_snake()
        self.check_collision()
        self.check_fail()
        

    def draw_elements(self):
        self.fruit.draw_fruit()
        self.snake.draw_snake()
        self.draw_score()

    def check_collision(self): # repostioning the fruit and incrasing the size of snake
        if self.fruit.pos == self.snake.body[0]:
            self.fruit.randomize()
            self.snake.add_block()

    def check_fail(self):
        if not 0 <= self.snake.body[0].x < cell_num or not 0 <= self.snake.body[0].y < cell_num:
            self.game_over()

        for block in self.snake.body[1:]:
            if block == self.snake.body[0]:
                self.game_over()

    def game_over(self):
        pygame.quit() # quits the gane
        sys.exit() # ends the code to make sure game quits

    def draw_score(self):
        score_text = str(len(self.snake.body) - 3)
        score_surface = game_font.render(score_text, True, 'Black')
        score_x = int(cell_size * cell_num - 60)
        score_y = int(cell_size * cell_num - 40)
        score_rect = score_surface.get_rect(center = (score_x,score_y)) 
        apple_rect = apple.get_rect(midright = (score_rect.left, score_rect.centery))

        screen.blit(score_surface,score_rect)
        screen.blit(pygame.transform.scale(apple, (cell_size, cell_size)),apple_rect)


pygame.init() 
cell_size = 40
cell_num = 20
screen = pygame.display.set_mode((cell_num * cell_size, cell_num * cell_size )) # This is the screen size
clock = pygame.time.Clock() # This helps infulence time in game and prevent fast gaming
apple = pygame.image.load('aa/apple.png').convert_alpha()

SCREEN_UPDATE = pygame.USEREVENT # custom event
pygame.time.set_timer(SCREEN_UPDATE,150) # timer every 150 ms. the speed of movements
game_font = pygame.font.Font(None, 25) 

main_game = MAIN()
while True:
    # all our elements will be here 
    for event in pygame.event.get():
        if event.type == pygame.QUIT: # This helps in quiting the game
            pygame.quit() # quits the gane
            sys.exit() # ends the code to make sure game quits
        if event.type == SCREEN_UPDATE:
            main_game.update()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                if main_game.snake.direction.y != 1:
                    main_game.snake.direction = Vector2(0,-1)
            if event.key == pygame.K_DOWN:
                if main_game.snake.direction.y != -1:
                    main_game.snake.direction = Vector2(0,1)
            if event.key == pygame.K_LEFT:
                if main_game.snake.direction.x != 1:
                    main_game.snake.direction = Vector2(-1,0)
            if event.key == pygame.K_RIGHT:
                if main_game.snake.direction.x != -1:
                    main_game.snake.direction = Vector2(1,0)

    screen.fill((175,215,70))
    main_game.draw_elements()
    pygame.display.update()
    clock.tick(120)