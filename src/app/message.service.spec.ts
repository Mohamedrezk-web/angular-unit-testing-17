import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {
    messageService = new MessageService();
  });

  it('should have no messages to start', () => {
    // Arrange

    // Act

    // Assert
    expect(messageService.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    // Arrange

    // Act
    messageService.add('message 1');

    // Assert
    expect(messageService.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
    // Arrange
    messageService.add('message 1');
    messageService.add('message 2');

    // Act
    messageService.clear();

    // Assert
    expect(messageService.messages.length).toBe(0);
  });
});
