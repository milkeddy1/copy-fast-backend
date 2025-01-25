import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContentsDto {
  @ApiProperty({ enum: ['text', 'file'] })
  @IsNotEmpty()
  @IsIn(['text', 'file'])
  readonly type: 'text' | 'file';

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly text?: string;

  @ApiProperty({
    default: null,
  })
  @IsString()
  @IsOptional()
  readonly file?: string | null;
}
