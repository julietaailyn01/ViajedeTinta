using System;
using System.Collections.Generic;
using Acceso_datos.Models;
using Microsoft.EntityFrameworkCore;

namespace Acceso_datos.Context;

public partial class ViajedetintaContext : DbContext
{
    public ViajedetintaContext()
    {
    }

    public ViajedetintaContext(DbContextOptions<ViajedetintaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ItemsPedido> ItemsPedidos { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Personalizacione> Personalizaciones { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-TKSMKV1\\SQLEXPRESS;Database=Viajedetinta;Trust Server Certificate=true;User Id=viajedetinta;password=Julieta01!;MultipleActiveResultSets=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ItemsPedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ItemsPed__3214EC0780459EBD");

            entity.ToTable("ItemsPedido");

            entity.Property(e => e.PrecioUnitario).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Pedido).WithMany(p => p.ItemsPedidos)
                .HasForeignKey(d => d.PedidoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ItemsPedi__Pedid__4316F928");

            entity.HasOne(d => d.Producto).WithMany(p => p.ItemsPedidos)
                .HasForeignKey(d => d.ProductoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ItemsPedi__Produ__440B1D61");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Pedidos__3214EC07CD32F60C");

            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValue("pendiente");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Total).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Pedidos__Usuario__403A8C7D");
        });

        modelBuilder.Entity<Personalizacione>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Personal__3214EC071772AE3C");

            entity.HasIndex(e => e.ItemPedidoId, "UQ__Personal__8433C88E3746C37B").IsUnique();

            entity.Property(e => e.ImagenCliente).HasMaxLength(300);
            entity.Property(e => e.MockupGenerado).HasMaxLength(300);

            entity.HasOne(d => d.ItemPedido).WithOne(p => p.Personalizacione)
                .HasForeignKey<Personalizacione>(d => d.ItemPedidoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Personali__ItemP__47DBAE45");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3214EC07142C0072");

            entity.Property(e => e.Categoria).HasMaxLength(50);
            entity.Property(e => e.ImagenUrl).HasMaxLength(300);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Personalizable).HasDefaultValue(true);
            entity.Property(e => e.Precio).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuarios__3214EC0769F1746E");

            entity.HasIndex(e => e.Email, "UQ__Usuarios__A9D1053401FB641E").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(200);
            entity.Property(e => e.Rol)
                .HasMaxLength(20)
                .HasConversion<string>();
                


        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
