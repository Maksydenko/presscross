export enum Tile {
  GrassSize = 4,
  Max = 8,
  Min = -8,
  PerRow = Tile.Max - Tile.Min + 1,
  Size = 40
}

export enum TileType {
  Grass = 'grass',
  Road = 'road'
}
