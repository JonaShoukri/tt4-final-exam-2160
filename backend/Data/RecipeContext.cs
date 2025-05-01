using Microsoft.EntityFrameworkCore;
using RecipeManager.Models;

namespace RecipeManager.Data;

public class RecipeContext : DbContext
{
    public RecipeContext(DbContextOptions<RecipeContext> options)
        : base(options)
    { }

    public DbSet<Recipe> Recipes { get; set; }
}