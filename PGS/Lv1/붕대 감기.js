function solution(bandage, health, attacks) {
  const maxHealth = health;
  const [t, x, y] = bandage;
  
  let lastAttackTime = 0;
  
  for (const [attackTime, damage] of attacks) {
      const timeDiff = attackTime - lastAttackTime - 1;
      const heal = timeDiff * x + Math.floor(timeDiff / t) * y;
      health = Math.min(health + heal, maxHealth);
      
      health -= damage;
      
      if (health <= 0) return -1;
      
      lastAttackTime = attackTime;
  }
  
  return health;
}