#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class ShoppingCartsController < ApplicationController
  before_action :set_shopping_cart, only: [:show, :edit, :update, :destroy]

  # GET /shopping_carts
  # GET /shopping_carts.json
  def index
    @shopping_carts = ShoppingCart.all
  end

  # GET /shopping_carts/1
  # GET /shopping_carts/1.json
  def show
  end

  # GET /shopping_carts/new
  def new
    @shopping_cart = ShoppingCart.new
  end

  # GET /shopping_carts/1/edit
  def edit
  end

  # POST /shopping_carts
  # POST /shopping_carts.json
  def create
    @shopping_cart = ShoppingCart.new(shopping_cart_params)

    respond_to do |format|
      if @shopping_cart.save
        format.html do
          redirect_to(
            @shopping_cart,
            notice: "Shopping cart was successfully created."
          )
        end

        format.json do
          render(:show, status: :created, location: @shopping_cart)
        end
      else

        format.html { render(:new) }

        format.json do
          render(json: @shopping_cart.errors, status: :unprocessable_entity)
        end
      end
    end
  end

  # PATCH/PUT /shopping_carts/1
  # PATCH/PUT /shopping_carts/1.json
  def update
    respond_to do |format|
      if @shopping_cart.update(shopping_cart_params)
        format.html do
          redirect_to(
            @shopping_cart,
            notice: "Shopping cart was successfully updated."
          )
        end

        format.json { render(:show, status: :ok, location: @shopping_cart) }
      else
        format.html { render(:edit) }

        format.json do
          render(json: @shopping_cart.errors, status: :unprocessable_entity)
        end
      end
    end
  end

  # DELETE /shopping_carts/1
  # DELETE /shopping_carts/1.json
  def destroy
    @shopping_cart.destroy

    respond_to do |format|
      format.html do
        redirect_to(
          shopping_carts_url,
          notice: "Shopping cart was successfully destroyed."
        )
      end

      format.json { head(:no_content) }
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  private def set_shopping_cart
    @shopping_cart = ShoppingCart.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  private def shopping_cart_params
    params.require(:shopping_cart).permit(:user_id)
  end
end
